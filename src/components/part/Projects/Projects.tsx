import { getProjects } from "@/modules/cms/queries";

export async function Projects() {
  const projects = await getProjects();

  console.log(projects.items);

  return (
    <div>
      <ul className="flex gap-16 px-8 py-8 overflow-x-auto">
        {projects.items.map((item) => (
          <li key={item.fields.slug} className="transition even:rotate-3 odd:-rotate-3 hover:rotate-0 hover:scale-110">
            <div className="rounded-xl bg-blue-800 p-6 w-72">
              <div className="rounded-lg bg-blue-900 aspect-video">
                <img
                  className="w-full h-full block object-contain"
                  src={item.fields.thumbnail.fields.file.url}
                  alt={item.fields.thumbnail.fields.description}
                />
              </div>
              <h3 className="font-bold text-2xl mt-2">{item.fields.name}</h3>
              <p className="mt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aspernatur atque, cum delectus eligendi enim eos et, impedit inventore iusto labore nam odit pariatur quia quidem repudiandae sequi soluta voluptate.</p>
              <div className="grid gap-2">
                {item.fields.linkPresentation && (
                  <a href={item.fields.linkPresentation}>
                    presentation
                  </a>
                )}
                {item.fields.linkProject && (
                  <a href={item.fields.linkProject}>
                    project
                  </a>
                )}
                {item.fields.link && (
                  <a href={item.fields.link}>
                    link
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}