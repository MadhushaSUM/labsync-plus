"use client";

import { useCurrentUser } from "@/hooks/api/auth/useCurrentUser";
import useGetUsers from "@/hooks/api/auth/useGetUsers";
import { Button, Card, Input, Table, TableColumnsType } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const { Meta } = Card;
const { Search } = Input;

const getColumns = (editHandle: (record: any) => void) => {
    const columns: TableColumnsType = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Branch',
            dataIndex: 'branch',
            key: 'branch',
            render(value) {
                return (
                    <>{value.name}</>
                )
            },
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'a',
            render: (_, record) => (
                <Button
                    size='small'
                    variant='outlined'
                    color='default'
                    onClick={() => editHandle(record)}
                >
                    Edit
                </Button>
            ),
        },
    ];

    return columns;
}

export default function UserSettings() {
    const router = useRouter();
    const currentUser = useCurrentUser();
    useEffect(() => {
        if (currentUser?.role != "admin") {
            toast.error("Admin privileges required!");
            router.push("/dashboard");
            return;
        }
    },[currentUser]);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchPhrase, setSearchPhrase] = useState<string | undefined>(undefined);
    const { data, isLoading, error } = useGetUsers({ limit: pageSize, skip: (currentPage - 1) * pageSize, search: searchPhrase });

    if (error) {
        toast.error(error.message);
    }

    const onSearch = (value: string) => {
        setSearchPhrase(value);
    }

    const onClickEditPatient = (record: any) => {
        const userData = encodeURIComponent(JSON.stringify(record));
        router.push(`/settings/users/edit?data=${userData}`);
    }

    if (currentUser?.role != "admin") return null; 

    return (
        <div>
            <Card className="apply_shadow">
                <Meta
                    title="Manage Users"
                    description="Approve user registrations and assign users to branches"
                />
                <div className="mt-5">
                    <div className="flex flex-row gap-5 mb-2 justify-between">
                        <Search placeholder="Search by name" style={{ width: "20%" }} onSearch={onSearch} allowClear />
                    </div>
                    <Table
                        dataSource={data?.content?.map(user => ({ ...user, key: user.id }))}
                        columns={getColumns(onClickEditPatient)}
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
    )
}