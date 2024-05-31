import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";

interface BreadCrumbServiceItem {
    name: string;
    link: string;
}

interface BreadCrumbServiceProps {
    breadcrumbArr: BreadCrumbServiceItem[];
    currentPageName: string;
}

export default function BreadCrumbService({ breadcrumbArr, currentPageName }: Readonly<BreadCrumbServiceProps>) {
    return (
        <div className="ml-6 my-3">
            <Breadcrumb>
                <BreadcrumbList>
                    {breadcrumbArr.map((item, index) => (
                        <BreadcrumbItem key={item.link}>
                            <BreadcrumbLink href={item.link}>{item.name}</BreadcrumbLink>
                            {index < breadcrumbArr.length - 1 && <BreadcrumbSeparator />}
                        </BreadcrumbItem>
                    ))}
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{currentPageName}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}
