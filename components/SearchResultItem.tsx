import { SelectedPatientContext } from "@/app/context/SelectedPatientContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";


const SearchResultItem = ({ name }: { name:string }) => {
    const { selectedPatient, setSelectedPatient } = useContext(SelectedPatientContext);
    const router = useRouter();

    const handleClick = () => {
        setSelectedPatient({
            ...selectedPatient, 
            name: name,
        });

        router.push("/selecttestdetails");
    }


    return (
        <div className="search_result_item" onClick={handleClick}>
            {name}
        </div>
    )
}

export default SearchResultItem