"use client";

import { Registration } from "@/types/entity/investigationRegister";
import { Card, Button, Table, Input, TableColumnsType, Flex, Tag } from "antd";
import { formatISO } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useGetInvestigationRegisters from "@/hooks/api/investigationRegister/useGetInvestigationRegisters";

const { Meta } = Card;
const { Search } = Input;

export default function InvestigationRegistration() {
    const router = useRouter();

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const { data, error, isLoading } = useGetInvestigationRegisters({ limit: pageSize, skip: (currentPage - 1) * pageSize })

    if (error) {
        toast.error(error.message);
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
                        onClick={() => { }}
                    >
                        Edit
                    </Button>
                </Flex>
            ),
        },
    ];

    const expandColumns: TableColumnsType = [
        {
            title: 'Test', dataIndex: 'test', key: 'testName',
            render(value) {
                return (
                    <p>{value.name}</p>
                )
            },
            width: 150,
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
                                onClick={() => { }}
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
            render: (_, record) => (
                <Button
                    size='small'
                    variant='outlined'
                    color='primary'
                    onClick={() => { }}
                >
                    Edit
                </Button>

            ),
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

    return (
        <div>
            <Card className="apply_shadow">
                <Meta
                    title="Investigation Registrations"
                    description="Manage your investigation registrations here"
                />


                <div className="mt-5">
                    <div className="flex flex-row gap-5 mb-2 justify-between">
                        <Search placeholder="Search by name" style={{ width: "20%" }} allowClear />
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
            </Card>
        </div>
    );
}