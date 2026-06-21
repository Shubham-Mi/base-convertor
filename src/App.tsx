import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CommonConverter } from '@/components/CommonConverter';
import { ArbitraryConverter } from '@/components/ArbitraryConverter';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center tracking-tight">
          Base Converter
        </h1>
        <Tabs defaultValue="common">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="common" className="flex-1">Common Bases</TabsTrigger>
            <TabsTrigger value="arbitrary" className="flex-1">Arbitrary</TabsTrigger>
          </TabsList>
          <TabsContent value="common">
            <CommonConverter />
          </TabsContent>
          <TabsContent value="arbitrary">
            <ArbitraryConverter />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
