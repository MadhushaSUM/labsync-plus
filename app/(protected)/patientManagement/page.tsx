import BreadCrumbService from "@/components/breadcrumb/BreadcrumbService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { payments } from "./mock-data";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return payments;
}

export default async function PatientManagement() {
    const breadcrumbArr = [
        {
            name: "Home",
            link: "/dashboard"
        }
    ];
    const currentPageName = "Patient management";

    const data = await getData()

    return (
        <div>
            <div className="apply_shadow">
                <Card>
                    <CardHeader>
                        <CardTitle>Patient management</CardTitle>
                        <CardDescription>
                            Manage your patient details here
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <BreadCrumbService breadcrumbArr={breadcrumbArr} currentPageName={currentPageName} />

            <div>
                <Card>
                    <CardContent>
                        <div className="container mx-auto py-10">
                            <DataTable columns={columns} data={data} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}