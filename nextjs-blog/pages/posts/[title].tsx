import { Article } from "@components/Article";
import { useRouter } from "next/router";

export default function Post () {
    const router = new useRouter();
    const { title } = router.query;

    return (
        <Article>
            <h1>{title}</h1>
            <p>Description</p>
        </Article>
    )

}
