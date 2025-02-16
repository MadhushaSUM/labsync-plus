"use client";

import useGetAuditTrails from "@/hooks/api/auditTrails/useGetAuditTrails";
import { useCurrentUser } from "@/hooks/api/auth/useCurrentUser";
import { Card, Table, TableColumnsType, DatePicker, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const { Meta } = Card;

const columns: TableColumnsType = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 80,
    },
    {
        title: 'Timestamp',
        dataIndex: 'time_stamp',
        key: 'timestamp',
        width: 220,
    },
    {
        title: 'User',
        dataIndex: 'user_name',
        key: 'user_name',
        width: 150,
    },
    {
        title: 'Operation',
        dataIndex: 'operation',
        key: 'operation',
        width: 200,
    },
    {
        title: 'Payload',
        dataIndex: 'payload',
        key: 'payload',
        render(value) {
            return <>{JSON.stringify(value, null, 2)}</>
        },
    },
];


export default function AuditTrail() {
    const router = useRouter();
    const currentUser = useCurrentUser();
    useEffect(() => {
        if (currentUser?.role != "admin") {
            toast.error("Admin privileges required!");
            router.push("/dashboard");
            return;
        }
    }, [currentUser]);

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

    if (currentUser?.role != "admin") return null;

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