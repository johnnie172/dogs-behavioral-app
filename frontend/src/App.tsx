import { SectionData } from 'sections';
import './App.css'
import { QuestionnaireForm } from './components/QuestionnaireForm'
import { SECTION_ENDPOINT } from './consts';
import { useAxiosFetch } from './hooks';

function App() {
  const { data, loading, error } = useAxiosFetch<SectionData>({
    api: `${SECTION_ENDPOINT}${"1"}`,
    withCredentials: false,
  });

  return (
    <div className="App">
      {loading && "Loading"}
      {data && <QuestionnaireForm sectionData={data}/>}
    </div>
  )
}

export default App
