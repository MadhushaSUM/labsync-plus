
"use client";

import BreadCrumbService from "@/components/breadcrumb/BreadcrumbService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export default function AgePreferenceSettings() {
    const breadcrumbArr = [
        {
            name: "Home",
            link: "/dashboard"
        }
    ];
    const currentPageName = "Age preference settings";

    return (
        <div>
            <div>
                <Card className="apply_shadow">
                    <CardHeader>
                        <CardTitle>Age preference settings</CardTitle>
                        <CardDescription>
                            Setup your default age type
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <BreadCrumbService breadcrumbArr={breadcrumbArr} currentPageName={currentPageName} />

            <div>
                <Card className="apply_shadow">
                    <CardContent>
                        <div className="mt-5 flex gap-5 items-center">
                            <p>Select your prefered age display option</p>

                            <Select defaultValue="Y">
                                <SelectTrigger className="w-[250px]">
                                    <SelectValue placeholder="Select age type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Y">Years only</SelectItem>
                                    <SelectItem value="YM">Years and months</SelectItem>
                                    <SelectItem value="YMD">Years, months and days</SelectItem>
                                    <SelectItem value="W">Weeks only</SelectItem>
                                    <SelectItem value="D">Days only</SelectItem>
                                </SelectContent>
                            </Select>

                            <Button
                                size="sm"
                            >
                                Save
                            </Button>
                        </div>
                    </CardContent>
                </Card>

            </div>

        </div>
    );
}