import { fetchAllProjects } from "@/lib/actions";
import { ProjectInterface } from "@/common.types";
import ProjectCard from "@/components/ProjectCard";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

type ProjectsSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[],
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    },
  }
}

type SearchParams = {
  category?: string | undefined,
  endCursor?: string | undefined,
};

type homeProps = {
  searchParams: SearchParams,
};

const Home = async ({ searchParams: { category, endCursor }} : homeProps) => {
  const data = await fetchAllProjects(category, endCursor) as ProjectsSearch;
  
  const projectsToDisplay = data?.projectSearch?.edges || [];
  
  if (projectsToDisplay.length === 0) {
    return (
      <section className="flexstart flex-col paddings">
        <Categories />
        <p className="no-result-text text-center">No projects found, go create some</p>
      </section>
    );
  }

  const pagination = data?.projectSearch?.pageInfo;
  return (
    <section className="flex-start flex-col paddings mb-16">
      <Categories />
      <section className="projects-grid">
        {projectsToDisplay.map(({ node } : {node: ProjectInterface}) => (
          <ProjectCard
            key={node?.id}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy?.name}
            avatarUrl={node?.createdBy.avatarUrl}
            userId={node?.createdBy?.id}
          />
        ))}
      </section>
      <LoadMore
        startCursor={pagination?.startCursor}
        endCursor={pagination?.endCursor}
        hasPreviousPage={pagination?.hasPreviousPage}
        hasNextPage={pagination?.hasNextPage}

      />
    </section>
  );
};

export default Home;