import Layout from "@/layout";
import { useRouter } from "next/router";

export default function UserById() {
    const router = useRouter()
    const { id } = router?.query

    return (
        <Layout metaTitle={`name ${id}`}>
            <p>User By Id {id}</p>
        </Layout>
    )
}