import { useEffect, useState } from "react"
import { fetchFolderContents } from "../api/documentService.ts"
export const Category = () => {
    const [data, setData] = useState<any[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const result: any = await fetchFolderContents();
            setData(result);
        };

        fetchData();
        console.log(data);
    }, [])
    return (
        <>
            {
                data.map((item, id) => {
                    return (
                        < h1 key={id}>{item.name}</h1 >
                    )
                })
            }
        </>

    )
}