import { ActionBar } from "../components/action-bar";
import { EditorPanel } from "../components/popups/editor-panel";
import { SettingsDialog } from "../components/popups/settings-dialog";
import { RiCloseCircleFill, RiMarkdownFill } from "@remixicon/react";
import { ModoxTable } from "../components/table";
import { Schema, SDK } from "@/lib/sdk";

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
          <ModoxTable
            schema={schema}
            data={documents}
          />
        ) : (
          <SplashScreen />
        )}
      </div>
      {/* popups */}
      <SettingsDialog />
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