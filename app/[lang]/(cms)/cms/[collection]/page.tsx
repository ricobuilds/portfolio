import { ActionBar } from "../components/action-bar";
import { EditorPanel } from "../components/popups/editor-panel";
import { SettingsDialog } from "../components/popups/settings-dialog";
import { RiCloseCircleFill, RiMarkdownFill } from "@remixicon/react";
import { ModoxTable } from "../components/table";
import { Schema, SDK } from "@/lib/sdk";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default async function CollectionView({ params }: { params: { collection: string } }) {

  const [schema, documents] = await Promise.all([
    SDK.schema.getSchema(params.collection) as Schema,
    SDK.document.listDocuments(params.collection)
  ])
  return (
    <div className="flex flex-col h-screen">
      <ActionBar />
      <div className="flex-1 h-full px-4 overflow-scroll">
        {!schema ? (
          <div className="flex flex-col items-center justify-center h-full">
            <RiCloseCircleFill className="w-20 h-20 text-slate-600" />
            <h2 className="text-lg font-bold">The <span className="text-amethyst-500">[{params.collection}]</span> collection has no schema!</h2>
            <p className="text-sm text-slate-500">We need a schema to read its documents</p>
            <div className="mt-3">
              <button className="px-3 py-1.5 text-sm text-white rounded-lg bg-amethyst-500">Create schema</button>
            </div>
          </div>
        ) : schema?.fields.length > 0 && documents.length > 0 ? (
          <Fragment>
            <ModoxTable
              schema={schema}
              data={documents}
            />
            <div className="border-t py-1.5 flex text-sm gap-4 items-center justify-end">
              <button
                className="border-obsidian-300 border flex gap-2 hover:bg-slate-100 duration-300 rounded-md items-center px-2 py-0.5"
              // onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              // disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>
              <button
                className="border-obsidian-300 border flex gap-2 hover:bg-slate-100 duration-300 rounded-md items-center px-2 py-0.5"
              // onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              // disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </Fragment>
        ) : (
          <SplashScreen />
        )}
      </div>
      {/* popups */}
      <SettingsDialog 
      schema={schema}
      />
      <EditorPanel />
    </div>
  )
}

const SplashScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <RiMarkdownFill className="w-20 h-20 text-slate-600" />
      <h2 className="text-lg font-bold">Create your first document</h2>
      <p className="text-sm text-slate-500">There are no documents in your collection.</p>
      <div className="mt-3">
        <button className="px-3 py-1.5 text-sm text-white rounded-lg bg-amethyst-500">Create new doc</button>
      </div>
    </div>
  )
}