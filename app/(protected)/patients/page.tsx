"use client";

import useGetPatients from "@/hooks/api/useGetPatients";
import { Card, Button, Table, Input, TableColumnsType } from "antd";
import { formatISO } from "date-fns";
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
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Date of birth',
            dataIndex: 'date_of_birth',
            key: 'date_of_birth',
            render(value) {
                return formatISO(value, { representation: 'date' });
            },
        },
        {
            title: 'WhatsApp number',
            dataIndex: 'whatsapp_number',
            key: 'whatsapp_number',
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

export default function PatientManagement() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchPhrase, setSearchPhrase] = useState<string | undefined>(undefined);
    const { data, isLoading, error } = useGetPatients({ limit: pageSize, skip: (currentPage - 1) * pageSize, search: searchPhrase });

    if (error) {
        toast.error(error.message);
    }

    const onSearch = (value: string) => {
        setSearchPhrase(value);
    }

    const onClickAdd = () => {
        router.push("patients/add");
    }

    const onClickEditPatient = (record: any) => {
        const patientData = encodeURIComponent(JSON.stringify(record));
        router.push(`/patients/edit?data=${patientData}`);
    }

    return (
        <div>
            <Card className="apply_shadow">
                <Meta
                    title="Patient Management"
                    description="Manage your patient details here"
                />

                <div className="mt-5">
                    <div className="flex flex-row gap-5 mb-2 justify-between">
                        <Search placeholder="Search by name" style={{ width: "20%" }} onSearch={onSearch} allowClear />
                        <Button color="primary" variant="solid" onClick={onClickAdd}>Add</Button>
                    </div>
                    <Table
                        dataSource={data?.content?.map(patient => ({ ...patient, key: patient.id }))}
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
    );
}