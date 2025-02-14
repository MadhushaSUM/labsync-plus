"use client";

import useGetBranches from "@/hooks/api/branches/useGetBranches";
import { Button, Card, Input, Table, TableColumnsType } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Telephone',
            dataIndex: 'telephone',
            key: 'telephone',
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

export default function BranchSettings() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchPhrase, setSearchPhrase] = useState<string | undefined>(undefined);
    const { data, isLoading, error } = useGetBranches({ limit: pageSize, skip: (currentPage - 1) * pageSize, search: searchPhrase });

    if (error) {
        toast.error(error.message);
    }

    const onSearch = (value: string) => {
        setSearchPhrase(value);
    }

    const onClickAdd = () => {
        router.push("/settings/branches/add");
    }

    const onClickEditPatient = (record: any) => {
        const branchData = encodeURIComponent(JSON.stringify(record));
        router.push(`/settings/branches/edit?data=${branchData}`);
    }


    return (
        <div>
            <Card className="apply_shadow">
                <Meta
                    title="Manage Branches"
                    description="Manage details of branch laboratories"
                />
                <div className="mt-5">
                    <div className="flex flex-row gap-5 mb-2 justify-between">
                        <Search placeholder="Search by name" style={{ width: "20%" }} onSearch={onSearch} allowClear />
                        <Button color="primary" variant="solid" onClick={onClickAdd}>Add</Button>
                    </div>
                    <Table
                        dataSource={data?.content?.map(branch => ({ ...branch, key: branch.id }))}
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