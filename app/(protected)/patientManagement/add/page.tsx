import BreadCrumbService from "@/components/breadcrumb/BreadcrumbService";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddEditPatient() {
    const breadcrumbArr = [
        {
            name: "Home",
            link: "/dashboard"
        },
        {
            name: "Patient management",
            link: "/patientManagement"
        }
    ];
    const currentPageName = "Add new patient";

    return (
        <div>
            <div className="apply_shadow">
                <Card>
                    <CardHeader>
                        <CardTitle>Add patient</CardTitle>
                        <CardDescription>
                            Add new patients here
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <BreadCrumbService breadcrumbArr={breadcrumbArr} currentPageName={currentPageName} />
        </div>
    );
}