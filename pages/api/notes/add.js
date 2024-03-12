export default async function handler(req, res) {
  const { query } = res;

  try {
    const result = await (
      await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notes),
      })
    ).json();
    if (result?.success) {
      router.push("/notes");
    }
  } catch (error) {}
}
