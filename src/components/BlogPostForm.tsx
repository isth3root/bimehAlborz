import { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Plus, Edit } from 'lucide-react';

interface BlogPostFormProps {
  post?: any;
  onSave: (post: any) => void;
}

export function BlogPostForm({ post, onSave }: BlogPostFormProps) {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...post,
      id: post?.id || Math.random().toString(),
      title,
      content,
      publishDate: post?.publishDate || new Date().toLocaleDateString('fa-IR'),
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {post ? (
          <Button size="sm" variant="outline">
            <Edit className="h-4 w-4" />
          </Button>
        ) : (
          <Button>
            <Plus className="h-4 w-4 ml-2" />
            افزودن پست جدید
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{post ? 'ویرایش پست وبلاگ' : 'افزودن پست جدید'}</DialogTitle>
          <DialogDescription>
            {post ? 'اطلاعات پست را ویرایش کنید' : 'اطلاعات پست جدید را وارد کنید'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                عنوان
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right">
                محتوا
              </Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">{post ? 'ذخیره' : 'افزودن'}</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
