"use client"
import { RiArrowDownLine, RiArrowUpLine, RiArticleLine, RiBookOpenLine, RiCheckLine, RiCloseFill, RiCloseLine, RiEditLine, RiFileAddFill, RiFileTextFill } from "@remixicon/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Fragment, useEffect, useRef, useState } from "react";
import { useToast } from "@/components/hooks/use-toast"
import { processImport } from "../../actions";
import { cn, sleep } from "@/lib/shared-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useImportStore } from "@/stores/import-store";
import { useParams } from "next/navigation";

type ImportMode = "terms" | "headlines"

export const Processor = () => {
  const { toast } = useToast()
  const { collection } = useParams()
  const collectionName = collection as string
  const editInputRef = useRef<HTMLInputElement>(null);

  // V0 suggestions
  const [mode, setMode] = useState<ImportMode>('terms')
  const [entries, setEntries] = useState<string[]>([])
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [importing, setImporting] = useState(false)

  const {
    // file,
    // terms,
    isProcessing,
    // isImporting,
    importProgress,
    // importMode,
    editingIndex,
    editValue,
    draggedIndex,
    // setFile,
    // setTerms,
    setIsProcessing,
    setIsImporting,
    setImportProgress,
    // setMode,
    setEditingIndex,
    setEditValue,
    setDraggedIndex,
    processTermsAuto,
    processTermsManual,
    removeDocument,
    startEditing,
    saveEdit,
    moveDocument,
    moveItem
  } = useImportStore()

  // Auto-focus input when editing starts
  useEffect(() => {
    if (editingIndex !== null && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingIndex]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const f = event.target.files?.[0]
    if (f) {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const text = e.target?.result
        if (typeof text === 'string') {
          console.log(file)
          setFile(f)
          setLoading(true)
          const _entries = text.split('\n').filter(line => line.trim() !== '')
          for (let i = 0; i < _entries.length; i++) {
            // Simulate API call to import each document
            await sleep(Math.floor(Math.random() * (50 - 30 + 1) + 50 * 10))
              .then(() => setImportProgress((i + 1) / _entries.length * 100))
            setEntries(prev => [...prev, _entries[i]])
          }
          setLoading(false)
        }
      }
      reader.readAsText(f as File)
    }
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      moveDocument(draggedIndex, index);
      setDraggedIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const resetProcessor = () => {
    setEntries([])
    setFile(null)
    setLoading(false)
    setImporting(false)
    setMode('terms')
  }

  async function handleImport() {
    if (file === null) return
    setImporting(true)
    try {
      await processImport({
        lines: entries,
        mode,
        collection: collectionName,
      })
      toast({
        title: "Import Complete",
        description: `Successfully imported ${entries.length} documents to "blog" collection.`,
      })
    } catch (error) {
      toast({
        title: "Import Unsuccessful",
        description: `Error: ${error}`,
      })
      console.error('Import failed:', error)
    } finally {
      setImporting(false)
      setFile(null)
    }
  }

  // const importDocuments = async () => {
  //   setIsImporting(true)
  //   setImportProgress(0)

  //   for (let i = 0; i < terms.length; i++) {
  //     // Simulate API call to import each document
  //     await sleep(Math.floor(Math.random() * (50 - 30 + 1) + 50 * 10))
  //       .then(() => setImportProgress((i + 1) / terms.length * 100))
  //     await handleImportDocument("blog", terms[i].original, importMode ? 'auto' : 'manual');
  //   }

  //   await sleep(800)
  //   setIsImporting(false)
  //   setImportProgress(0)
  //   toast({
  //     title: "Import Complete",
  //     description: `Successfully imported ${terms.length} documents to "blog" collection.`,
  //   })
  // }

  return (
    <Fragment>
      {importing && (
        <div className="absolute z-50 -translate-x-1/2 bottom-12 left-1/2">
          <Card className="w-[300px]">
            <CardHeader className="space-y-1">
              {<CardTitle className="text-lg font-medium">Imported {entries.length} files ({importProgress.toFixed(0)}%)</CardTitle>}
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-full space-y-1">
                  <Progress
                    value={Number(importProgress.toFixed(2))}
                    className={`
                h-4
              `}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      <AlertDialog onOpenChange={entries && file ? resetProcessor : undefined}>
        <AlertDialogTrigger asChild>
          <div className={`flex cursor-pointer items-center gap-2 transition-all group ${importing ? "text-obsidian-300 pointer-events-none" : "text-slate-500"}`}>
            <RiFileAddFill className="w-5 h-5 group-hover:text-black" />
            <span className="text-sm group-hover:text-black">Import Documents</span>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="overflow-scroll max-h-[80vh]">
          <AlertDialogHeader>
            <AlertDialogTitle>Batch Import Documents</AlertDialogTitle>
            <AlertDialogDescription>
              Upload a TXT file to import documents to the <span className="text-amethyst-500">[{collection}]</span> collection.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="">
            {/* Mode Selector */}

            <div className="grid grid-cols-2 gap-4 mb-3">
              <button
                onClick={() => setMode('terms')}
                className={`p-4 rounded-lg border-2 transition-all ${mode === 'terms'
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200 hover:border-gray-300"
                  }`}
              >
                <RiBookOpenLine
                  className={`w-6 h-6 mb-2 mx-auto ${mode === 'terms' ? "text-indigo-500" : "text-gray-400"
                    }`}
                />
                <h3 className="text-sm font-medium">Terms Mode</h3>
                <p className="mt-1 text-xs text-gray-500">
                  Generate semantical headlines
                </p>
              </button>
              <button
                onClick={() => setMode('headlines')}
                className={`p-4 rounded-lg border-2 transition-all ${mode === 'headlines'
                  ? "border-amethyst-500 bg-amethyst-50"
                  : "border-gray-200 hover:border-gray-300"
                  }`}
              >
                <RiArticleLine
                  className={`w-6 h-6 mb-2 mx-auto ${mode === 'headlines' ? "text-amethyst-500" : "text-gray-400"
                    }`}
                />
                <h3 className="text-sm font-medium">Headlines Mode</h3>
                <p className="mt-1 text-xs text-gray-500">
                  Import as pre-written headlines
                </p>
              </button>
            </div>
            <div className={cn("p-8 text-center border-2 border-indigo-300 border-dashed rounded-lg hover:border-indigo-500 bg-indigo-100/10", file ? "pointer-events-none" : null)}>
              <input
                type="file"
                accept=".txt"
                onChange={handleFileUpload}
                className={cn("hidden",)}
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center space-y-2 cursor-pointer"
              >
                <RiFileAddFill className="w-12 h-12 text-slate-500" />
                <span className="text-sm text-slate-500">{file ? file.name : "Click to upload a TXT file"}</span>
                <span className="px-3 py-1.5 border-obsidian-300 text-sm border rounded-lg text-slate-500">Choose a file</span>
              </label>
            </div>
            <div className="mt-6 space-y-3">
              <h2 className="text-sm font-semibold">
                Documents ({entries.length})
              </h2>
              {loading && (
                <div className="w-full space-y-1">
                  <Progress
                    value={Number(importProgress.toFixed(2))}
                    className={`h-2`}
                  />
                </div>
              )}
              {/* TODO: #2 add tag components */}
              {/* {entries.length > 0 && (
                <div className="flex gap-3 text-sm">
                  <span className="text-jade-600">{entries.length} entries loaded</span>
                  <span className="text-sunstone-600">2 skipped</span>
                  <span className="text-celuria-600">53 remaining</span>
                </div>
              )} */}
              <div className="flex flex-col gap-2">
                {entries.length > 0 && entries.map((file, idx) => (
                  <div
                    key={idx}
                    draggable
                    onDragStart={() => handleDragStart(idx)}
                    onDragOver={(e) => handleDragOver(e, idx)}
                    onDragEnd={handleDragEnd}
                    className={`flex items-center gap-3 p-3 bg-white rounded-lg border ${draggedIndex === idx
                      ? "border-amethyst-500 shadow-md"
                      : "border-amethyst-100 hover:border-amethyst-500"
                      } transition-all group cursor-move`}>
                    <div className="p-2 rounded bg-amethyst-100">
                      <RiFileTextFill size={16} className="text-amethyst-600" />
                    </div>
                    <div className="flex-1">
                      {editingIndex === idx ? (
                        <div className="flex items-center gap-2">
                          <input
                            ref={editInputRef}
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") saveEdit(idx);
                              if (e.key === "Escape") setEditingIndex(null);
                            }}
                            className="px-2 py-1 text-sm border rounded focus:outline-none focus:border-indigo-500"
                          />
                          <button
                            onClick={() => saveEdit(idx)}
                            className="p-1 text-green-600 hover:text-green-700"
                          >
                            <RiCheckLine className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingIndex(null)}
                            className="p-1 text-red-600 hover:text-red-700"
                          >
                            <RiCloseFill className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <p className="w-64 text-sm font-medium truncate">{file}</p>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-1 transition-opacity opacity-0 group-hover:opacity-100">
                      <button
                        onClick={() => moveItem(idx, "up")}
                        disabled={idx === 0}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                      >
                        <RiArrowUpLine className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => moveItem(idx, "down")}
                        disabled={idx === entries.length - 1}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                      >
                        <RiArrowDownLine className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => startEditing(idx)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <RiEditLine className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeDocument(idx)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <RiCloseLine className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={resetProcessor}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleImport} disabled={entries.length == 0} className="bg-amethyst-500">Import {entries.length} {entries.length === 1 ? "Document" : "Documents"}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Fragment>
  );
};

