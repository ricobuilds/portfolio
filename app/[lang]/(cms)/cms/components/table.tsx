"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/dropdown"
import { useUIStore } from "@/stores/ui-store";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { Fragment, ReactElement, useEffect, useMemo, useState } from "react";
import { capitalise, cn, sleep } from "@/lib/shared-utils";
import { RemixiconComponentType, RiCloseCircleFill, RiArrowRightUpLine, RiCalendarLine, RiHashtag, RiKeyLine, RiLoader2Line, RiMarkdownFill, RiMarkdownLine, RiText, RiToggleLine, RiLink } from "@remixicon/react";
import { useParams } from "next/navigation";
import { Schema, SchemaField, FieldType, MDXDocument, BaseDocument } from "@/lib/sdk";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";

interface SchemaTableProps {
    schema: Schema
    data: BaseDocument[]
    alwaysVisibleColumns?: string[];
}

export function ModoxTable({ schema, data, alwaysVisibleColumns = ['title'] }: SchemaTableProps) {
    const { collection } = useParams()
    const collectionName = collection as string
    const { visibleColumns, setVisibleColumns, toggleColumn, getVisibleColumns } = useUIStore()
    const [localSchema, setLocalSchema] = useState<Schema | null>()
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    const {
        viewMode,
        sortColumn,
        sortDirection,
        selectedPosts,
        currentRecord,
        setSortColumn,
        setSortDirection,
        setSelectedPosts,
        setCurrentRecord,
        toggleEditorSheet
    } = useUIStore()

    const handleRecordInteraction = (doc: BaseDocument) => {
        if (viewMode === "select") {
            setSelectedPosts(doc.slug)
        }
        if (viewMode === "view") {
            setCurrentRecord(doc)
            toggleEditorSheet()
        }
    }

    // const sortedDocuments = [...data].sort((a, b) => {
    //     if (a['frontmatter'][sortColumn] < b['frontmatter'][sortColumn]) return sortDirection === 'asc' ? -1 : 1
    //     if (a['frontmatter'][sortColumn] > b['frontmatter'][sortColumn]) return sortDirection === 'asc' ? 1 : -1
    //     return 0
    // })
    const sortedDocuments = useMemo(() => {
        return [...data].sort((a, b) => {
            // @ts-ignore
            const aValue = a[sortColumn];
            // @ts-ignore
            const bValue = b[sortColumn];
            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }, [data, sortColumn, sortDirection]);

    const handleSort = (field: string) => {
        if (field === sortColumn) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortColumn(field)
            setSortDirection("asc")
        }
    }

    const postsPerPage = 19
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = sortedDocuments.slice(indexOfFirstPost, indexOfLastPost)
    const totalPages = Math.ceil(sortedDocuments.length / postsPerPage)

    useEffect(() => {
        setLoading(true)
        setLocalSchema(schema)
        if (!visibleColumns[collectionName]) {
            setVisibleColumns(
                collectionName,
                schema.fields.map((field) => field.name).filter(field => field !== 'id')
            )
        }
        setLoading(false)
    }, [schema, collectionName, alwaysVisibleColumns, setVisibleColumns, visibleColumns])

    if (!localSchema || loading) {
        return (
            <LoadingScreen />
        )
        return <NoSchema />
    }

    const allColumns = localSchema.fields.filter(key => key.name !== 'id').map((field) => field.name)
    const visibleColumnsInOrder = getVisibleColumns(collectionName, allColumns)

    const typetoIconMap: { [key in FieldType]: JSX.Element } = {
        id: <RiKeyLine className="w-4 h-4" />,
        text: <RiText className="w-4 h-4" />,
        "rich-text": <RiMarkdownLine className="w-4 h-4" />,
        number: <RiHashtag className="w-4 h-4" />,
        date: <RiCalendarLine className="w-4 h-4" />,
        boolean: <RiToggleLine className="w-4 h-4" />,
        status: <RiLoader2Line className="w-4 h-4" />,
        relation: <RiArrowRightUpLine className="w-4 h-4" />,
        image: <RiArrowRightUpLine className="w-4 h-4" />,
        list: <RiArrowRightUpLine className="w-4 h-4" />,
        url: <RiArrowRightUpLine className="w-4 h-4" />,
        slug: <RiLink className="w-4 h-4" />,
    };

    return (
        <Fragment>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead
                            className={
                                cn("max-w-[10px]")
                            }>
                        </TableHead>
                        {visibleColumnsInOrder.map((column, vIdx) => {
                            const field = localSchema.fields.find((field) => field.name === column)
                            return (
                                <TableHead
                                    key={vIdx}
                                    title={field?.label}
                                    onClick={() => handleSort(field?.name as string)}
                                    className={
                                        cn(
                                            "cursor-pointer",
                                            "max-w-[200px] overflow-hidden text-slate-500 hover:text-black font-normal",
                                            field?.name === "title" ? "w-[250px]" : field?.name === "slug" ? "w-[150px]" : "flex-auto",
                                        )
                                    }
                                >
                                    <div className="flex items-center gap-2">
                                        {field && typetoIconMap[field.type]}
                                        <span className="truncate">{capitalise(column)}</span>
                                        {sortColumn === field?.name && (
                                            <span className="ml-1">
                                                {sortDirection === 'asc' ? '▲' : '▼'}
                                            </span>
                                        )}
                                    </div>
                                </TableHead>
                            )
                        }
                        )}
                        <TableHead>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="flex items-center justify-end gap-1">
                                        Show
                                        <ChevronDown className="w-4 h-4" />
                                        <span className="sr-only">Show Fields</span>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {localSchema.fields
                                        .filter((field) => field.name !== 'id' && field.name !== 'title')
                                        .map((field, dIdx) => (
                                            <DropdownMenuCheckboxItem
                                                key={dIdx}
                                                checked={visibleColumnsInOrder.includes(field.name)}
                                                onCheckedChange={() => toggleColumn(collectionName, field.name, allColumns)}
                                            >
                                                <span className="mr-2">{typetoIconMap[field.type]}</span>
                                                {field.label || field.name}
                                            </DropdownMenuCheckboxItem>
                                        ))}
                                </DropdownMenuContent>
                            </DropdownMenu >
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="overflow-scroll text-sm">
                    {currentPosts.map((document: BaseDocument, docIdx) => {
                        return (
                            <TableRow
                                key={docIdx}
                                onClick={() => handleRecordInteraction(document)}
                                className={
                                    cn(
                                        'text-gray-400 h-8 hover:text-black [&_td]:border-r hover:bg-slate-100 cursor-pointer',
                                        // selectedPosts.includes(document['slug']) ? "bg-slate-100" : null
                                    )
                                }
                            >
                                <TableCell
                                    className={
                                        cn("max-w-[10px] h-8")
                                    }>
                                    <Checkbox
                                        checked={selectedPosts.includes(document['slug'])}
                                        onClick={() => handleRecordInteraction(document)}
                                        className={
                                            cn(
                                                "transition-opacity duration-500 ease-in-out transform-all",
                                                viewMode === "select" ? "opacity-100 visible" : 'opacity-0 invisible',
                                                selectedPosts.includes(document['slug']) ? "text-white bg-celuria-400" : null
                                            )
                                        } />
                                </TableCell>
                                {visibleColumnsInOrder.map((column, vcIdx) => {
                                    const field = localSchema.fields.find((field) => field.name === column)
                                    return (
                                        <TableCell
                                            key={column + vcIdx}
                                            // @ts-ignore
                                            title={document[field?.name]}
                                            className={cn(
                                                "max-w-[200px] overflow-hidden",
                                                field?.name === "title" ? "w-[250px]" : field?.name === "slug" ? "w-[150px]" : "flex-auto",
                                                "truncate"
                                            )}>
                                            {/* @ts-ignore */}
                                            {renderCellContent(document[field?.name], field)}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            <div className="border-t py-1.5 flex text-sm gap-4 items-center justify-end">
                <div className="text-sm font-medium">
                    Page {currentPage} of {totalPages}
                </div>
                <button
                    className={cn(
                        currentPage === 1 ? "bg-slate-200 border-obsidian-100 opacity-60 pointer-events-none" : null,
                        "border-obsidian-300 border flex gap-2 hover:bg-slate-100 duration-300 rounded-md items-center px-2 py-0.5",
                    )}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                </button>
                <button
                    className={cn(
                        currentPage === totalPages ? "bg-slate-200 opacity-60 border-obsidian-100 pointer-events-none" : null,
                        "border-obsidian-300 border flex gap-2 hover:bg-slate-100 duration-300 rounded-md items-center px-2 py-0.5",
                    )}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>
        </Fragment>
    )
}

function renderCellContent(value: any, field?: SchemaField) {
    if (!field) return String(value || '')

    switch (field.type) {
        case 'date':
            return value ? format(new Date(value), 'dd/MM/yyyy, HH:mm') : ''
        case 'boolean':
            return value ? 'Yes' : 'No'
        case 'rich-text':
            return value ? `${value.substring(0, 50)}...` : ''
        default:
            return String(value || '')
    }
}

const NoSchema = () => {
    const { collection } = useParams()
    return (
        <div className="flex flex-col items-center justify-center flex-1">
            <RiCloseCircleFill className="w-20 h-20 text-slate-600" />
            <h2 className="text-lg font-bold">The <span className="text-amethyst-500">[{collection}]</span> collection has no schema!</h2>
            <p className="text-sm text-slate-500">We need a schema to read its documents</p>
            <div className="mt-3">
                <button className="px-3 py-1.5 text-sm text-white rounded-lg bg-amethyst-500">Create schema</button>
            </div>
        </div>
    )
}

const LoadingScreen = () => {
    const { collection } = useParams()
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <Spinner />
            <h2 className="mt-6 text-lg font-bold">Loading the <span className="text-amethyst-500">[{collection}]</span> schema...</h2>
            <p className="text-sm text-slate-500">Wait a moment while we scan your schema.</p>
        </div>
    )
}

const Spinner = () => {
    return (
        <div role="status">
            <svg aria-hidden="true" className={`inline w-16 h-16 text-gray-200 animate-spin fill-celuria-500`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    )
}