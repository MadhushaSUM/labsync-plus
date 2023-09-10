import SearchResultItem from "./SearchResultItem";

const SearchResultList = ({list}: {list: Array<string>}) => {
    if (list.length !== 0) {
        return (
            <div className="search_result_list overflow-y-auto h-50">
                {
                    list.map((result) => {
                        return <SearchResultItem name={result.name} key={result.id}/>
                    })
                }
            </div>
        )
    }
}

export default SearchResultList