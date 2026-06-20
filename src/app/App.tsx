import Header from "@/shared/ui/Header";
import Chats from "@/shared/ui/Chats";
import Prompt from "@/shared/ui/Prompt";
import QueryProvider from "@/app/provider/QueryProvider";

const App = () => {

  return (
    <QueryProvider>
      <main className="w-full h-dvh bg-secondary-bg flex flex-col font-sans">
        <Header />
        <Chats />
        <Prompt />
      </main>
    </QueryProvider>
  );
}

export default App;