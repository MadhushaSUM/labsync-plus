"use client";

import { ScrollArea } from "@/components/custom-ui/ScrollArea";
import formMapper from "@/components/test-data-forms/FormMapper";
import { useCurrentUser } from "@/hooks/api/auth/useCurrentUser";
import useGetBranches from "@/hooks/api/branches/useGetBranches";
import useGetDataEmptyInvestigations from "@/hooks/api/investigationData/useGetDataEmptyInvestigations";
import { BranchType } from "@/types/entity/branch";
import { DataEmptyTests } from "@/types/entity/investigation";
import { Card, Col, List, Row, Select, Spin } from "antd";
import { formatISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const { Option } = Select;

export default function Dashboard() {
    const [selectedTest, setSelectedTest] = useState<DataEmptyTests | null>(null);

    // Branch
    const [branchSearchPhrase, setBranchSearchPhrase] = useState("");
    const [selectedBranch, setSelectedBranch] = useState<BranchType>();

    const { data: branchResults, error: branchFetchError, isLoading: branchLoading } = useGetBranches({ limit: 5, skip: 0, search: branchSearchPhrase });
    if (branchFetchError) {
        toast.error(branchFetchError.message);
    }
    const onBranchSearch = (value: string) => {
        setBranchSearchPhrase(value);
    }
    const handleBranchSelect = (value: number) => {
        setSelectedBranch(branchResults?.content.find(branch => branch.id == value));
    }

    const currentUser = useCurrentUser();
    
    useEffect(() => {
        setSelectedBranch(branchResults?.content.find(branch => branch.id == currentUser?.branch.id));
        setFetchData(true);
    }, [currentUser]);

    const [fetchedTestList, setFetchedTestList] = useState<DataEmptyTests[]>();

    const [fetchData, setFetchData] = useState<boolean>(false);
    const { data, error, isLoading, } = useGetDataEmptyInvestigations(fetchData, selectedBranch?.id);
    if (error) {
        toast.error(error.message);
    }

    const handleListItemClick = (item: DataEmptyTests) => {
        setSelectedTest(item);
    }
    const clearSelectedTest = (testRegisterId: number, testId: number) => {
        setSelectedTest(null);
        setFetchedTestList(fetchedTestList?.filter((item) => (item.testRegisterId != testRegisterId || item.testId != testId)));
    }

    useEffect(() => {
        if (data?.content) {
            setFetchedTestList(data.content);
        }
    }, [data]);


    return (
        <div>
            <Card
                className="apply_shadow"
            >
                <div className="mt-5">
                    <Row gutter={[10, 10]}>
                        <Col span={6}>
                            <div className="ring-1 ring-gray-300/20 rounded-lg p-2 mb-2">
                                <Select
                                    showSearch
                                    allowClear
                                    placeholder="Search for a branch"
                                    onSearch={onBranchSearch}
                                    onSelect={handleBranchSelect}
                                    onClear={() => setSelectedBranch(undefined)}
                                    notFoundContent={branchLoading ? <Spin size="small" /> : "No branch found"}
                                    filterOption={false}
                                    className="w-full"
                                    value={selectedBranch?.id}
                                >
                                    {branchResults && branchResults.content.map((branch) => (
                                        <Option key={branch.id} value={branch.id}>
                                            {branch.name}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                            <ScrollArea
                                className="ring-1 ring-gray-300/20 rounded-lg"
                            >
                                <div>
                                    <List<DataEmptyTests>
                                        size="small"
                                        loading={isLoading}
                                        style={{ height: "calc(100vh - 220px)" }}
                                        dataSource={fetchedTestList}
                                        renderItem={(item) => {
                                            return (
                                                <List.Item
                                                    onClick={() => handleListItemClick(item)}
                                                >
                                                    <p className="cursor-pointer">{`[${item.patientName}] [${formatISO(item.date, { representation: "date" })}] [${item.testName}] [${item.ref_number}]`}</p>
                                                </List.Item>
                                            )
                                        }}
                                    />
                                </div>
                            </ScrollArea>
                        </Col>

                        <Col span={18} className="ring-1 ring-gray-300/20 rounded-lg">
                            <ScrollArea>
                                <div
                                    style={{ height: "calc(100vh - 220px)" }}
                                    className="rounded-lg flex justify-center w-full p-5 overflow-y-auto"
                                >
                                    {selectedTest ? (
                                        formMapper[selectedTest.testId] ? (
                                            React.createElement(formMapper[selectedTest.testId], { data: selectedTest, clearScreen: clearSelectedTest })
                                        ) : (
                                            <p>Form not found</p>
                                        )
                                    ) : (
                                        <p>Please select an item</p>
                                    )}
                                </div>
                            </ScrollArea>
                        </Col>
                    </Row>
                </div>
            </Card>
        </div>
    );
}