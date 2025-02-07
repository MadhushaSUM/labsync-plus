"use client";

import useGetInvestigationFields from "@/hooks/api/investigations/useGetInvestigationFields";
import useGetInvestigations from "@/hooks/api/investigations/useGetInvestigations";
import { NormalRange, Test, TestField } from "@/types/entity/investigation";
import { Button, Card, Col, Flex, Form, InputNumber, Radio, Row, Select, Space, Spin } from "antd";
import { CloseOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useAddNormalRangeRule from "@/hooks/api/investigations/useAddNormalRangeRule";
import useGetNormalRangesByTestField from "@/hooks/api/investigations/useGetNormalRangesByTestField";

const { Meta } = Card;
const { Option } = Select;


export default function NormalRangesSettings() {
    const [form] = Form.useForm();
    const [coveredPercent, setCoveredPercent] = useState<{ male: number, female: number, other: number }>({ male: 0, female: 0, other: 0 });

    // Investigation
    const [investigationSearchPhrase, setInvestigationSearchPhrase] = useState("");
    const [selectedInvestigation, setSelectedInvestigation] = useState<Test>();

    const { data: investigationResults, error: investigationFetchError, isLoading: investigationLoading } = useGetInvestigations({ limit: 5, skip: 0, search: investigationSearchPhrase });
    if (investigationFetchError) {
        toast.error(investigationFetchError.message);
    }
    const onInvestigationSearch = (value: string) => {
        setInvestigationSearchPhrase(value);
    }
    const handleInvestigationSelect = (value: number) => {
        setSelectedInvestigation(investigationResults?.content.find(investigation => investigation.id == value));
        setSelectedInvestigationField(undefined);
    }

    // Investigation Fields
    const [selectedInvestigationField, setSelectedInvestigationField] = useState<TestField>();

    const { data: investigationFieldsResults, error: investigationFieldsFetchError, isLoading: investigationFieldsLoading } = useGetInvestigationFields(selectedInvestigation?.id);
    if (investigationFieldsFetchError) {
        toast.error(investigationFieldsFetchError.message);
    }
    const handleInvestigationFieldsSelect = (value: number) => {
        setSelectedInvestigationField(investigationFieldsResults?.content.find(investigationFields => investigationFields.id == value));
    }

    const calculateProgressPercent = () => {
        const rules = form.getFieldValue("rules");
        let malePercent = 0;
        let femalePercent = 0;
        let otherPercent = 0;
        if (rules) {
            for (const rule of rules) {
                if (rule.gender.includes("Male")) {
                    malePercent += (rule.ageUpper.y - rule.ageLower.y);
                }
                if (rule.gender.includes("Female")) {
                    femalePercent += (rule.ageUpper.y - rule.ageLower.y);
                }
                if (rule.gender.includes("Other")) {
                    otherPercent += (rule.ageUpper.y - rule.ageLower.y);
                }
            }
        }
        setCoveredPercent({ male: malePercent, female: femalePercent, other: otherPercent });
    }

    // Get old rules
    const { data: previousRules, error: rulesFetchError, isLoading: rulesLoading } = useGetNormalRangesByTestField(selectedInvestigationField?.id);
    if (rulesFetchError) {
        toast.error(rulesFetchError.message);
    }
    useEffect(() => {
        if (previousRules?.content) {
            form.setFieldValue("rules", previousRules.content.rules);
        }
    }, [previousRules?.content]);


    // Save normal range rules
    const { mutateAsync: updateNormalRangeRules, isPending } = useAddNormalRangeRule();
    const saveNormalRangeRules = async (values: any) => {

        const normalRange: NormalRange = {
            test_field_id: selectedInvestigationField?.id!,
            test_id: selectedInvestigation?.id!,
            rules: values.rules,
            version: previousRules?.content?.version || 1,
        }

        const promise = updateNormalRangeRules(normalRange);

        toast.promise(promise, {
            loading: "Updating the registration",
        });
        try {
            const res = await (await promise).json();
            toast.success(res.message);
        } catch (error: any) {
            toast.error(error.toString())
        }
    }

    return (
        <div>
            <div>
                <Card className="apply_shadow">
                    <Meta
                        title="Normal Ranges"
                        description="Manage normal ranges"
                    />
                    <div className="mt-5">
                        <div className="flex flex-row gap-2">
                            <Select
                                showSearch
                                allowClear
                                placeholder="Search for a investigation"
                                onSearch={onInvestigationSearch}
                                onSelect={handleInvestigationSelect}
                                onClear={() => {
                                    setSelectedInvestigation(undefined);
                                    setSelectedInvestigationField(undefined);
                                }}
                                notFoundContent={investigationLoading ? <Spin size="small" /> : "No investigation found"}
                                filterOption={false}
                                style={{ width: 300 }}
                                value={selectedInvestigation?.id}
                            >
                                {investigationResults && investigationResults.content.map((investigation) => (
                                    <Option key={investigation.id} value={investigation.id}>
                                        {investigation.name}
                                    </Option>
                                ))}
                            </Select>

                            <Select
                                allowClear
                                placeholder="Search for a investigation field"
                                onSelect={handleInvestigationFieldsSelect}
                                onClear={() => setSelectedInvestigationField(undefined)}
                                disabled={investigationLoading || investigationFieldsLoading || !selectedInvestigation}
                                loading={investigationLoading || investigationFieldsLoading}
                                // filterOption={false}
                                style={{ width: 300 }}
                                value={selectedInvestigationField?.id}
                            >
                                {investigationFieldsResults && investigationFieldsResults.content.map((investigationFields) => (
                                    <Option key={investigationFields.id} value={investigationFields.id}>
                                        {investigationFields.name}
                                    </Option>
                                ))}
                            </Select>
                        </div>

                        <div>{selectedInvestigationField &&
                            <div className="mt-5 flex flex-col justify-center items-center content-center">
                                <Form
                                    labelCol={{ span: 6 }}
                                    wrapperCol={{ span: 18 }}
                                    form={form}
                                    style={{ maxWidth: 800 }}
                                    autoComplete="off"
                                    onValuesChange={calculateProgressPercent}
                                    onFinish={saveNormalRangeRules}
                                    disabled={isPending || rulesLoading}
                                >
                                    <div>
                                        <Form.List name="rules">
                                            {(fields, { add, remove }) => (
                                                <div className="flex flex-col gap-5" >
                                                    {fields.map((field) => (
                                                        <Card
                                                            size="small"
                                                            title={`Rule ${field.name + 1}`}
                                                            key={field.key}
                                                            extra={
                                                                <CloseOutlined
                                                                    onClick={() => {
                                                                        remove(field.name);
                                                                    }}
                                                                />
                                                            }
                                                        >
                                                            <Form.Item label="Gender" name={[field.name, 'gender']}>
                                                                <Select
                                                                    mode="multiple"
                                                                    allowClear
                                                                >
                                                                    <Select.Option value="Male">Male</Select.Option>
                                                                    <Select.Option value="Female">Female</Select.Option>
                                                                    <Select.Option value="Other">Other</Select.Option>
                                                                </Select>
                                                            </Form.Item>

                                                            <Form.Item label="Type" name={[field.name, 'type']}>
                                                                <Radio.Group
                                                                    block
                                                                    options={[
                                                                        { label: 'Range', value: 'range' },
                                                                        { label: '≥', value: '≥' },
                                                                        { label: '≤', value: '≤' },
                                                                    ]}
                                                                    optionType="button"
                                                                    buttonStyle="solid"
                                                                />
                                                            </Form.Item>

                                                            <Row>
                                                                <Col
                                                                    span={12}
                                                                >
                                                                    <Form.Item label="Age lower bound" labelCol={{ span: 12 }}>
                                                                        <Space.Compact>
                                                                            <Form.Item name={[field.name, 'ageLower', 'y']}>
                                                                                <InputNumber placeholder="YY" style={{ width: 60 }} />
                                                                            </Form.Item>
                                                                            <Form.Item name={[field.name, 'ageLower', 'm']}>
                                                                                <InputNumber placeholder="MM" style={{ width: 60 }} />
                                                                            </Form.Item>
                                                                            <Form.Item name={[field.name, 'ageLower', 'd']}>
                                                                                <InputNumber placeholder="DD" style={{ width: 60 }} />
                                                                            </Form.Item>
                                                                        </Space.Compact>
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col
                                                                    span={12}
                                                                >
                                                                    <Form.Item label="Age upper bound" labelCol={{ span: 12 }}>
                                                                        <Space.Compact>
                                                                            <Form.Item name={[field.name, 'ageUpper', 'y']}>
                                                                                <InputNumber placeholder="YY" style={{ width: 60 }} />
                                                                            </Form.Item>
                                                                            <Form.Item name={[field.name, 'ageUpper', 'm']}>
                                                                                <InputNumber placeholder="MM" style={{ width: 60 }} />
                                                                            </Form.Item>
                                                                            <Form.Item name={[field.name, 'ageUpper', 'd']}>
                                                                                <InputNumber placeholder="DD" style={{ width: 60 }} />
                                                                            </Form.Item>
                                                                        </Space.Compact>
                                                                    </Form.Item>
                                                                </Col>

                                                                <Col
                                                                    span={12}
                                                                >
                                                                    <Form.Item label="Value lower bound" labelCol={{ span: 12 }} name={[field.name, 'valueLower']}>
                                                                        <InputNumber style={{ width: 180 }} />
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col
                                                                    span={12}
                                                                >
                                                                    <Form.Item label="Value upper bound" labelCol={{ span: 12 }} name={[field.name, 'valueUpper']}>
                                                                        <InputNumber style={{ width: 180 }} />
                                                                    </Form.Item>
                                                                </Col>
                                                            </Row>
                                                        </Card>
                                                    ))}

                                                    <Button type="dashed" onClick={() => add({
                                                        gender: ["Male", "Female", "Other"],
                                                        type: 'range',
                                                        ageLower: { d: 0, m: 0, y: 0 },
                                                        ageUpper: { d: 0, m: 0, y: 120 }
                                                    })} block>
                                                        + Add Normal Range Rule
                                                    </Button>
                                                </div>
                                            )}
                                        </Form.List>
                                    </div>

                                    <div className="mt-5">
                                        <Flex align="end" justify="end">
                                            <Button
                                                variant="solid"
                                                color="primary"
                                                htmlType="submit"
                                            >
                                                Save
                                            </Button>
                                        </Flex>
                                    </div>
                                </Form>
                            </div>
                        }
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}