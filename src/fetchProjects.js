import { createClient } from "contentful";
import { useEffect,useState } from "react";

const client = createClient({
  space: "jf4hckocl4dh",
  environment: "master",
  accessToken: "G0qIwXKzH2_DJEpymIQt-WOxV4V8Y_DqEm-M8y4dWn8",
});

export const useFetchProjects = () => {
          const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);
    

    const getData = async () => {
        try {
            const response = await client.getEntries({ content_type: "projects" })
            const projects = response.items.map(item => {
                const { title, url, image } = item.fields
                const id = item.sys.id;
                const img = image?.fields?.file?.url
                return {title,url,id,img}
            })
            setProjects(projects)
                 setLoading(false);
        } catch (error) {
            console.log(error);
                  setLoading(false);
        }
    }
      useEffect(() => {
        getData();
      }, []);
     return { loading, projects };
}
    
  