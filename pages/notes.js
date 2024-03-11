import Layout from "@/layout";

export default function Notes(notes) {
  console.log("contoh notes =>", notes);
  return (
    <>
      <Layout metaTitle="asdasd">
        {notes.data?.map((item) => {
          <div>
            <p>{item.title}</p>
            <p>{item.description}</p>
          </div>;
        })}
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes");
  const notes = await res.json();
  return { props: { notes } };
}
