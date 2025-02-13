"use client";

import { Registration } from "@/types/entity/investigationRegister";
import { Card, Button, Table, TableColumnsType, Flex, Tag, InputNumber, DatePicker, Select, Spin, Modal } from "antd";
import { formatISO } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import useGetInvestigationRegisters from "@/hooks/api/investigationRegister/useGetInvestigationRegisters";
import { calculateAge } from "@/lib/date-utils";
import useGetPatients from "@/hooks/api/useGetPatients";
import { debounce } from "lodash";
import ShowData from "@/components/custom-ui/ShowData";
import useUpdateInvestigationAsDataNotAdded from "@/hooks/api/investigationData/useUpdateInvestigationAsDataNotAdded";

const { Meta } = Card;
const { Option } = Select;

export default function InvestigationRegistration() {
    const router = useRouter();

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [filters, setFilters] = useState({
        patientId: undefined,
        refNumber: undefined,
        dateRange: { fromDate: undefined, toDate: undefined },
    });

    const [debouncedFilters, setDebouncedFilters] = useState(filters);

    const updateFilter = (key: any, value: any) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const debouncedUpdate = useMemo(
        () =>
            debounce((newFilters) => {
                setDebouncedFilters(newFilters);
            }, 500),
        []
    );

    useEffect(() => {
        debouncedUpdate(filters);
        return () => debouncedUpdate.cancel();
    }, [filters, debouncedUpdate]);

    const { data, error, isLoading } = useGetInvestigationRegisters({
        limit: pageSize,
        skip: (currentPage - 1) * pageSize,
        patientId: debouncedFilters.patientId,
        refNumber: debouncedFilters.refNumber,
        startDate: debouncedFilters.dateRange.fromDate,
        endDate: debouncedFilters.dateRange.toDate,
    });

    if (error) {
        toast.error(error.message);
    }

    // Patient
    const [patientSearchPhrase, setPatientSearchPhrase] = useState("");

    const { data: patientResults, error: patientFetchError, isLoading: patientLoading } = useGetPatients({ limit: 5, skip: 0, search: patientSearchPhrase });
    if (patientFetchError) {
        toast.error(patientFetchError.message);
    }
    const onPatientSearch = (value: string) => {
        setPatientSearchPhrase(value);
    }

    const [testRegistrations, setTestRegistrations] = useState<Registration[]>([]);

    const columns: TableColumnsType<Registration> = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        {
            title: 'Patient Name', dataIndex: 'patient', key: 'patientName',
            render(value) {
                return (
                    <p>{value.name}</p>
                )
            },
        },
        {
            title: 'Date', dataIndex: 'date', key: 'date',
            render(value) {
                return (
                    <p>{formatISO(value, { representation: "date" })}</p>
                )
            },
        },
        {
            title: 'Reference number', dataIndex: 'ref_number', key: 'refNumber',
            render(value) {
                return (
                    <p>{value ? value : <Tag bordered={false} color="warning">Empty</Tag>}</p>
                )
            }
        },
        { title: 'Total cost', dataIndex: 'total_cost', key: 'totalCost' },
        { title: 'Paid price', dataIndex: 'paid_price', key: 'paidPrice' },
        {
            title: 'Action',
            dataIndex: '',
            key: 'a',
            render: (_, record) => (
                <Flex gap={5}>
                    <Button
                        size='small'
                        variant='outlined'
                        color='primary'
                        onClick={() => { }}
                    >
                        Print receipt
                    </Button>
                    <Button
                        size='small'
                        variant='outlined'
                        color='default'
                        onClick={() => {
                            const registrationData = encodeURIComponent(JSON.stringify(record));
                            router.push(`/registrations/edit?data=${registrationData}`)
                        }}
                    >
                        Edit
                    </Button>
                </Flex>
            ),
        },
    ];

    const { mutateAsync: updateDataAddedStatus } = useUpdateInvestigationAsDataNotAdded();
    const [loadingRows, setLoadingRows] = useState<Record<string, boolean>>({});
    const expandColumns: TableColumnsType = [
        {
            title: 'Test', dataIndex: 'test', key: 'testName',
            render(value) {
                return (
                    <p>{value.name}</p>
                )
            },
            width: 250,
        },
        {
            title: 'Requested doctor', dataIndex: 'doctor', key: 'doctorName',
            render(value) {
                return (
                    <p>{value ? value.name : <Tag bordered={false} color="warning">Empty</Tag>}</p>
                )
            },
            width: 300,
        },
        {
            title: 'Data', dataIndex: 'data', key: 'data',
            render(value) {
                return (
                    <p>
                        {value ?
                            <Button
                                size="small"
                                color="primary"
                                variant="outlined"
                                onClick={() => showDataInModal(value)}
                            >
                                View
                            </Button>
                            :
                            <Tag
                                bordered={false}
                                color="warning">
                                Empty
                            </Tag>}
                    </p>
                )
            }
        },
        {
            title: 'Data added', dataIndex: 'data_added', key: 'dataAdded',
            render(value) {
                return (
                    <Tag bordered={false} color={value ? "success" : "processing"}>
                        {value ? "Yes" : "No"}
                    </Tag>
                )
            },
            width: 150,
        },
        {
            title: 'Printed', dataIndex: 'printed', key: 'printed',
            render(value) {
                return (
                    <Tag bordered={false} color={value ? "success" : "processing"}>
                        {value ? "Yes" : "No"}
                    </Tag>
                )
            },
            width: 150,
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'a',
            width: 150,
            render: (_, record) => {
                const rowKey = `${record.testRegisterId}-${record.test.id}`;

                return (
                    <Button
                        size='small'
                        variant='outlined'
                        color='primary'
                        loading={loadingRows[rowKey]}
                        onClick={async () => {
                            setLoadingRows(prev => ({ ...prev, [rowKey]: true }));

                            const promise = updateDataAddedStatus({
                                investigationRegisterId: Number(record.testRegisterId),
                                investigationId: Number(record.test.id),
                            });

                            toast.promise(promise, {
                                loading: "Adding investigation to dashboard",
                                success: "Investigation added to dashboard",
                            });

                            try {
                                await promise;
                            } catch (error: any) {
                                toast.error(error.toString());
                            } finally {
                                setLoadingRows(prev => ({ ...prev, [rowKey]: false }));
                            }
                        }}
                    >
                        Edit
                    </Button>
                );
            },
        },
    ];

    const expandedRowRender = (record: any) => (
        <Table
            columns={expandColumns}
            dataSource={
                testRegistrations
                    .find((value) => value.id == record.id)?.registeredTests
                    .map((item) => ({ ...item, testRegisterId: record.id }))
            }
            pagination={false}
            size="small"
        />
    );


    const onClickAdd = () => {
        router.push("registrations/add");
    }

    useEffect(() => {
        if (data) {
            setTestRegistrations(data.content);
        } else {
            setTestRegistrations([]);
        }
    }, [data]);

    const showDataInModal = (data: any) => {
        Modal.info({
            width: "50%",
            title: 'Investigation data',
            content: (
                <div>
                    <ShowData data={data} />
                </div>
            ),
            onOk() { },
        });
    }

    return (
        <div>
            <Card className="apply_shadow">
                <Meta
                    title="Investigation Registrations"
                    description="Manage your investigation registrations here"
                />


                <div className="mt-5">
                    <div className="flex flex-row gap-5 mb-2 justify-between">
                        <div className="flex flex-row gap-2">
                            <Select
                                showSearch
                                allowClear
                                placeholder="Search for a patient"
                                onSearch={onPatientSearch}
                                onSelect={(value) => updateFilter("patientId", value)}
                                onClear={() => updateFilter("patientId", undefined)}
                                notFoundContent={patientLoading ? <Spin size="small" /> : "No patients found"}
                                filterOption={false}
                                style={{ width: 300 }}
                            >
                                {patientResults && patientResults.content.map((patient) => (
                                    <Option key={patient.id} value={patient.id}>
                                        {patient.name} [{calculateAge(patient.date_of_birth)}]
                                    </Option>
                                ))}
                            </Select>
                            <InputNumber
                                placeholder="Reference Number"
                                controls={false}
                                style={{ width: 150 }}
                                onChange={(value) => updateFilter("refNumber", value)}
                            />
                            <DatePicker.RangePicker
                                onChange={(_, dateStrings) => {
                                    updateFilter("dateRange", {
                                        fromDate: dateStrings[0] ? formatISO(new Date(dateStrings[0]), { representation: "date" }) : undefined,
                                        toDate: dateStrings[1] ? formatISO(new Date(dateStrings[1]), { representation: "date" }) : undefined,
                                    });
                                }}
                                allowClear
                            />
                        </div>
                        <Button color="primary" variant="solid" onClick={onClickAdd}>Add</Button>
                    </div>
                    <Table
                        columns={columns}
                        expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
                        dataSource={testRegistrations.map((value) => ({ ...value, key: value.id }))}
                        loading={isLoading}
                        pagination={{
                            current: currentPage,
                            pageSize,
                            total: data?.totalElements,
                            showSizeChanger: true,
                            onChange(page, pageSize) {
                                setCurrentPage(page || 1);
                                setPageSize(pageSize || 10);
                            },
                        }}
                    />
                </div>
            </Card >
        </div >
    );
}