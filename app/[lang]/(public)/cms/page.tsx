import { Button } from "@/components/ui/button"
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { listBuckets, listContent, createFrontmatterSchema } from "@/lib/cms"
import { z } from 'zod'

const mockPosts = [
  { id: 1, title: "Getting Started with React", category: "React", status: "Published", date: "2023-10-15" },
  { id: 2, title: "Advanced TypeScript Tips", category: "TypeScript", status: "Draft", date: "2023-10-14" },
  { id: 3, title: "CSS Grid Layout Mastery", category: "CSS", status: "Published", date: "2023-10-13" },
  { id: 4, title: "Node.js Best Practices", category: "Node.js", status: "Under Review", date: "2023-10-12" },
  { id: 5, title: "Introduction to GraphQL", category: "GraphQL", status: "Published", date: "2023-10-11" },
  { id: 6, title: "React Hooks in Depth", category: "React", status: "Published", date: "2023-10-10" },
  { id: 7, title: "Building RESTful APIs", category: "Backend", status: "Draft", date: "2023-10-09" },
  { id: 8, title: "JavaScript ES6+ Features", category: "JavaScript", status: "Published", date: "2023-10-08" },
  { id: 9, title: "Docker for Beginners", category: "DevOps", status: "Under Review", date: "2023-10-07" },
  { id: 10, title: "Machine Learning with Python", category: "AI", status: "Published", date: "2023-10-06" },
]

export default async function BlogAdminPanel() {

  const postSchema = createFrontmatterSchema({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()),
  })

  const allBuckets = await listBuckets()
  const bucket = await listContent(allBuckets[0], postSchema)

  return (
    <div className="container p-6 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Blog Admin Panel</h1>

      <div className="grid gap-6 mb-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Buckets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {allBuckets.length}
            </div>
          </CardContent>
        </Card>
        {allBuckets.map(async (bucket) => {
          const filesQty = await listContent(bucket, postSchema)
          return (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">{bucket.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {filesQty.length}
                </div>
              </CardContent>
            </Card>
          )
        })}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockPosts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Published Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPosts.filter(post => post.status === "Published").length}
            </div>
          </CardContent>
        </Card>
        <Card className="flex items-center justify-center h-full text-white bg-black">
          <div className="text-xl font-bold">
            New Bucket +
          </div>
        </Card>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost">
                  Title
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost">
                  Category
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost">
                  Status
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost">
                  Date
                </Button>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody >
            {mockPosts.map((post) => (
              <TableRow key={post.id} className="w-full">
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell>
                  <Badge variant={post.status === "Published" ? "default" : "secondary"}>
                    {post.status}
                  </Badge>
                </TableCell>
                <TableCell>{post.date}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="w-8 h-8 p-0">
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>View</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end py-4 space-x-2">
        <Button
          variant="outline"
          size="sm"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}