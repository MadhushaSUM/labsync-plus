import BreadCrumbService from "@/components/breadcrumb/BreadcrumbService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DoctorManagement() {


    const breadcrumbArr = [
        {
            name: "Home",
            link: "/dashboard"
        }
    ];
    const currentPageName = "Doctor management";

    return (
        <div>
            <div>
                <Card className="apply_shadow">
                    <CardHeader>
                        <CardTitle>Doctor management</CardTitle>
                        <CardDescription>
                            Manage your doctor details here
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <BreadCrumbService breadcrumbArr={breadcrumbArr} currentPageName={currentPageName} />

            <div>
                <Card className="apply_shadow">
                    <CardContent>
                        Manage doctors table
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}