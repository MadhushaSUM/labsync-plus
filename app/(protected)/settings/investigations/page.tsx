"use client";

import useGetInvestigations from "@/hooks/api/investigations/useGetInvestigations";
import useUpdateInvestigationPrice from "@/hooks/api/investigations/useUpdateInvestigationPrice";
import { Test } from "@/types/entity/investigation";
import { Button, Card, Form, Input, Modal, Table, TableColumnsType } from "antd";
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
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Price (Rs.)',
            dataIndex: 'price',
            key: 'price'
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
                    Update Price
                </Button>
            ),
        },
    ];
    return columns;
}

export default function InvestigationsSettings() {
    const router = useRouter();

    // Investigations
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchPhrase, setSearchPhrase] = useState<string | undefined>(undefined);

    const { data, error, isLoading } = useGetInvestigations({ limit: pageSize, skip: (currentPage - 1) * pageSize, search: searchPhrase });
    if (error) {
        toast.error(error.message);
    }
    const onSearch = (value: string) => {
        setSearchPhrase(value);
    }

    const [form] = Form.useForm();
    const [editFormValues, setEditFormValues] = useState<Test>();
    const [open, setOpen] = useState(false);


    const onClickPriceUpdate = (record: any) => {
        const test: Test = {
            id: record.id,
            name: record.name,
            code: record.code,
            price: record.price,
            version: record.version,
        }
        setEditFormValues(test);
        setOpen(true);

        form.setFieldsValue({
            price: test.price,
        });
    }

    const { mutateAsync: updateInvestigationPrice, isPending } = useUpdateInvestigationPrice();
    async function onPriceUpdateSubmit(values: any) {
        if (editFormValues?.id) {
            const test: Test = {
                id: editFormValues.id,
                name: editFormValues.name,
                code: editFormValues.code,
                price: values.price,
                version: editFormValues.version,
            }
            const promise = updateInvestigationPrice({ investigationId: editFormValues.id, investigation: test });

            toast.promise(promise, {
                loading: "Updating patient",
                success: "Patient has been updated"
            });
            try {
                await promise;
                setOpen(false);
            } catch (error: any) {
                toast.error(error.toString())
            }
        }
    }

    return (
        <div>
            <div>
                <Card className="apply_shadow">
                    <Meta
                        title="Investigations"
                        description="Set investigation price"
                    />
                    <div className="mt-5">
                        <div className="flex flex-row gap-5 mb-2 justify-between">
                            <Search placeholder="Search by name" style={{ width: "20%" }} onSearch={onSearch} allowClear />
                        </div>
                        <Table
                            dataSource={data?.content?.map(patient => ({ ...patient, key: patient.id }))}
                            columns={getColumns(onClickPriceUpdate)}
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

                    <div>
                        {editFormValues && (
                            <Modal
                                open={open}
                                title="Edit investigation price"
                                okText="Update"
                                cancelText="Cancel"
                                onCancel={() => setOpen(false)}
                                onOk={() => form.submit()}
                                destroyOnClose
                            >
                                <Form<Test>
                                    layout="vertical"
                                    form={form}
                                    onFinish={onPriceUpdateSubmit}
                                    disabled={isPending}
                                >
                                    <Form.Item
                                        name="price"
                                        label="Price"
                                        rules={[{ required: true, message: 'Please enter a valid number!' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Form>
                            </Modal>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}