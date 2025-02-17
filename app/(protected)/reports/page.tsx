"use client";

import { useEffect, useMemo, useState } from 'react';
import { Button, Card, DatePicker, Flex, InputNumber, Select, Spin, Switch, Table, Tag, Typography } from "antd";
import { CheckOutlined, CloseOutlined, DownloadOutlined, ExportOutlined, PrinterOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { calculateAge } from '@/lib/date-utils';
import { formatISO } from 'date-fns';
import { toast } from 'sonner';
import useGetPatients from '@/hooks/api/useGetPatients';
import { debounce } from 'lodash';
import useGetDataAddedInvestigations from '@/hooks/api/investigationData/useGetDataAddedInvestigations';
import { DataEmptyTests } from '@/types/entity/investigation';
import pdfTemplateMapper from '@/lib/pdf/pdfTemplateMapper';
import { useQueryClient } from '@tanstack/react-query';
import { fetchNormalRangesByInvestigationId } from '@/services/investigationAPI';
import useUpdateInvestigationAsPrinted from '@/hooks/api/investigationData/useUpdateInvestigationAsPrinted';
import useGetBranches from '@/hooks/api/branches/useGetBranches';
import { useCurrentUser } from '@/hooks/api/auth/useCurrentUser';
import useSendWhatsAppMessage from '@/hooks/api/investigationData/useSendWhatsAppMessage';

const { Meta } = Card;
const { Option } = Select;
const { Text } = Typography;

export default function Reports() {
    const currentUser = useCurrentUser();

    const [downloadLoading, setDownloadLoading] = useState(false);
    const [printingLoading, setPrintingLoading] = useState(false);
    const [exportLoading, setExportLoading] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [mergeDisabled, setMergeDisabled] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [filters, setFilters] = useState({
        patientId: undefined,
        refNumber: undefined,
        branchId: currentUser?.branch.id,
        dateRange: { fromDate: undefined, toDate: undefined },
        allReports: false,
    });

    useEffect(() => {
        setFilters((prev) => ({ ...prev, branchId: currentUser?.branch.id }));
    }, [currentUser]);

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

    const { data, error, isLoading } = useGetDataAddedInvestigations({
        limit: pageSize,
        skip: (currentPage - 1) * pageSize,
        patientId: debouncedFilters.patientId,
        refNumber: debouncedFilters.refNumber,
        branchId: debouncedFilters.branchId,
        startDate: debouncedFilters.dateRange.fromDate,
        endDate: debouncedFilters.dateRange.toDate,
        allReports: debouncedFilters.allReports,
    });
    if (error) {
        toast.error(error.message);
    }

    useEffect(() => {
        debouncedUpdate(filters);
        return () => debouncedUpdate.cancel();
    }, [filters, debouncedUpdate]);

    // Patient
    const [patientSearchPhrase, setPatientSearchPhrase] = useState("");

    const { data: patientResults, error: patientFetchError, isLoading: patientLoading } = useGetPatients({ limit: 5, skip: 0, search: patientSearchPhrase });
    if (patientFetchError) {
        toast.error(patientFetchError.message);
    }
    const onPatientSearch = (value: string) => {
        setPatientSearchPhrase(value);
    }

    // Branch
    const [branchSearchPhrase, setBranchSearchPhrase] = useState("");

    const { data: branchResults, error: branchFetchError, isLoading: branchLoading } = useGetBranches({ limit: 5, skip: 0, search: branchSearchPhrase });
    if (branchFetchError) {
        toast.error(branchFetchError.message);
    }
    const onBranchSearch = (value: string) => {
        setBranchSearchPhrase(value);
    }

    const columns = useMemo(() => [
        {
            title: "Date",
            dataIndex: "date",
            render: (value: any) => <>{formatISO(value, { representation: "date" })}</>,
        },
        {
            title: "Patient Name",
            dataIndex: "patientName",
            render: (value: any) => <>{value}</>,
        },
        {
            title: "Reference Number",
            dataIndex: "ref_number",
            render: (value: any) => (
                <>
                    {value ? value : <Tag color="warning">Empty</Tag>}
                </>
            ),
        },
        { title: "Test", dataIndex: "testName" },
        {
            title: "Actions",
            render: (record: any) => (
                <div style={{ display: "flex", gap: "5px" }}>
                    <Button loading={printingLoading} size="small" onClick={() => handlePrintReports(record.key)}>
                        {<PrinterOutlined />}
                    </Button>
                    <Button loading={downloadLoading} size="small" onClick={() => handleDownloadReport(record.key)}>
                        {<DownloadOutlined />}
                    </Button>
                    <Button loading={exportLoading} size="small" onClick={() => handleExportReports(record.key)}>
                        {<ExportOutlined />}
                    </Button>
                    <Button loading={exportLoading} size="small" onClick={() => handleWhatsAppReports(record.key)}>
                        {<WhatsAppOutlined />}
                    </Button>
                </div>
            ),
        },
    ], [data?.content]);


    const queryClient = useQueryClient();
    const handleDownloadReport = async (key: string) => {
        try {
            setDownloadLoading(true);
            const selectedItem = data?.content.find((item) =>
                `${item.testId},${item.testRegisterId}` === key
            ) as DataEmptyTests;

            const normalRanges = await queryClient.fetchQuery({
                queryKey: ["normal-ranges", selectedItem.testId],
                queryFn: ({ signal }) => fetchNormalRangesByInvestigationId(selectedItem.testId, signal),
                staleTime: 1000 * 60 * 60, // Keep for this time
            });

            await pdfTemplateMapper(false, false, selectedItem, normalRanges.content);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setDownloadLoading(false);
        }
    };
    const handleMergeReports = () => {
    }

    const { mutateAsync: updatePrintedStatus } = useUpdateInvestigationAsPrinted();
    const handlePrintReports = async (key: string) => {
        try {
            setPrintingLoading(true);
            const selectedItem = data?.content.find((item) => `${item.testId},${item.testRegisterId}` === key) as DataEmptyTests;

            const normalRanges = await queryClient.fetchQuery({
                queryKey: ["normal-ranges", selectedItem.testId],
                queryFn: ({ signal }) => fetchNormalRangesByInvestigationId(selectedItem.testId, signal),
                staleTime: 1000 * 60 * 60, // Keep for this time
            });

            await pdfTemplateMapper(true, false, selectedItem, normalRanges.content);

            const promise = updatePrintedStatus({ investigationRegisterId: selectedItem.testRegisterId, investigationId: selectedItem.testId });
            toast.promise(promise, {
                loading: "Updating printed status",
                success: "Printed status updated!"
            });
            try {
                await promise;
                queryClient.invalidateQueries({ queryKey: ["data-added-investigations"], exact: false });
            } catch (error: any) {
                toast.error(error.toString())
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setPrintingLoading(false);
        }
    }
    const handleExportReports = async (key: string) => {
        try {
            setExportLoading(true);
            const selectedItem = data?.content.find((item) =>
                `${item.testId},${item.testRegisterId}` === key
            ) as DataEmptyTests;

            const normalRanges = await queryClient.fetchQuery({
                queryKey: ["normal-ranges", selectedItem.testId],
                queryFn: ({ signal }) => fetchNormalRangesByInvestigationId(selectedItem.testId, signal, currentUser?.id),
                staleTime: 1000 * 60 * 60, // Keep for this time
            });

            await pdfTemplateMapper(false, true, selectedItem, normalRanges.content);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setExportLoading(false);
        }
    };

    const { mutateAsync: sendWhatsAppMessage } = useSendWhatsAppMessage();
    const handleWhatsAppReports = async (key: string) => {
        try {
            const selectedItem = data?.content.find((item) =>
                `${item.testId},${item.testRegisterId}` === key
            ) as DataEmptyTests;

            if (selectedItem) {
                const promise = sendWhatsAppMessage({
                    investigationRegisterId: selectedItem.testRegisterId,
                    investigationId: selectedItem.testId,
                    patientId: selectedItem.patientId,
                });

                toast.promise(promise, {
                    loading: "Sending link to the patient",
                    success: "Link sent!"
                });

                try {
                    await promise;
                } catch (error: any) {
                    toast.error(error.toString())
                }
            }

        } catch (error: any) {
            toast.error(error.message);
        }
    }

    return (
        <div>
            <Card className="apply_shadow">
                <Meta
                    title="Print Reports"
                    description="Print reports of data added investigations"
                />
                <div className="mt-5">
                    <div className="mb-2">
                        <Flex justify="space-between">
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
                                <Select
                                    showSearch
                                    allowClear
                                    placeholder="Search for a branch"
                                    onSearch={onBranchSearch}
                                    onSelect={(value) => updateFilter("branchId", value)}
                                    onClear={() => updateFilter("branchId", undefined)}
                                    notFoundContent={branchLoading ? <Spin size="small" /> : "No branch found"}
                                    filterOption={false}
                                    style={{ width: 150 }}
                                    value={filters.branchId}
                                >
                                    {branchResults && branchResults.content.map((branch) => (
                                        <Option key={branch.id} value={branch.id}>
                                            {branch.name}
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
                                    style={{ width: 250 }}
                                    allowClear
                                />
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Text>All reports : </Text>
                                    <Switch
                                        checked={filters.allReports}
                                        onChange={(checked) => updateFilter("allReports", checked)}
                                        checkedChildren={<CheckOutlined />}
                                        unCheckedChildren={<CloseOutlined />}
                                    />
                                </div>
                            </div>

                            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                                <Button onClick={() => { }} disabled={!selectedRowKeys.length}>Print</Button>
                                {/* <Button onClick={handleMergeReports} disabled={mergeDisabled}>Merge</Button> */}
                                <Button onClick={() => { }} disabled={!selectedRowKeys.length}>Export</Button>
                            </div>
                        </Flex>
                    </div>
                    <Table
                        rowSelection={{
                            selectedRowKeys,
                            onChange: (keys) => setSelectedRowKeys(keys),
                        }}
                        columns={columns}
                        dataSource={data?.content.map((value) => ({ ...value, key: `${value.testId},${value.testRegisterId}` }))}
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
            </Card>
        </div>
    );
}