"use client";

import useGetAuditTrails from "@/hooks/api/auditTrails/useGetAuditTrails";
import { Card, Table, TableColumnsType, DatePicker } from "antd";
import { useState } from "react";
import { toast } from "sonner";

const { Meta } = Card;

const columns: TableColumnsType = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Timestamp',
        dataIndex: 'time_stamp',
        key: 'timestamp',
    },
    {
        title: 'User',
        dataIndex: 'user_id',
        key: 'userId',
    },
    {
        title: 'Operation',
        dataIndex: 'operation',
        key: 'operation',
    },
    {
        title: 'Payload',
        dataIndex: 'payload',
        key: 'payload',
        render(value) {
            return <p>{JSON.stringify(value, null, 2)}</p>
        },
    },
];


export default function AuditTrail() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchDates, setSearchDates] = useState<{ startDate: string | undefined, endDate: string | undefined }>({ startDate: undefined, endDate: undefined });
    const { data, isLoading, error } = useGetAuditTrails({ limit: pageSize, skip: (currentPage - 1) * pageSize, startDate: searchDates?.startDate, endDate: searchDates?.endDate });

    if (error) {
        toast.error(error.message);
    }

    const onSearchDateChange = (_: any, dateStrings: [string, string]) => {
        if (dateStrings[0] != '' && dateStrings[1] != '') {
            setSearchDates({
                startDate: dateStrings[0],
                endDate: dateStrings[1]
            });
        } else if (dateStrings[0] == '' && dateStrings[1] == '') {
            setSearchDates({
                startDate: undefined,
                endDate: undefined
            });
        }

    }
    
    return (
        <div>
            <Card className="apply_shadow">
                <Meta
                    title="Audit Trail"
                    description="Audit critical operations"
                />

                <div className="mt-5">
                    <div className="flex flex-row gap-5 mb-2 justify-between">
                        <DatePicker.RangePicker allowClear onChange={onSearchDateChange} />
                    </div>
                    <Table
                        dataSource={data?.content?.map(patient => ({ ...patient, key: patient.id }))}
                        columns={columns}
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