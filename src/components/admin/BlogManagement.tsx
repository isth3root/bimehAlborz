import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { BlogPostForm } from '../BlogPostForm';

export function BlogManagement({
  blogPosts,
  handleAddBlogPost,
  handleEditBlogPost,
  handleDeleteBlogPost,
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>مدیریت وبلاگ</CardTitle>
            <CardDescription>
              لیست پست‌های وبلاگ و مدیریت آنها
            </CardDescription>
          </div>
          <BlogPostForm onSave={handleAddBlogPost} />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>عنوان</TableHead>
              <TableHead>تاریخ انتشار</TableHead>
              <TableHead>عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.publishDate}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <BlogPostForm post={post} onSave={handleEditBlogPost} />
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteBlogPost(post.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
