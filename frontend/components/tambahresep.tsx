import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AddRecipePage() {
    const session = await getServerSession();
    if (!session) redirect("/resep/tambah");

    return <h1 className="text-3xl font-bold">Tambah Resep</h1>;
}
