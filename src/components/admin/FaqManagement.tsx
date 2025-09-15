import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { FaqForm } from '../FaqForm';

export function FaqManagement({
  faqs,
  handleAddFaq,
  handleEditFaq,
  handleDeleteFaq,
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>مدیریت سوالات متداول</CardTitle>
            <CardDescription>
              لیست سوالات متداول و مدیریت آنها
            </CardDescription>
          </div>
          <FaqForm onSave={handleAddFaq} />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>سوال</TableHead>
              <TableHead>پاسخ</TableHead>
              <TableHead>عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {faqs.map((faq) => (
              <TableRow key={faq.id}>
                <TableCell>{faq.question}</TableCell>
                <TableCell>{faq.answer}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <FaqForm faq={faq} onSave={handleEditFaq} />
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteFaq(faq.id)}>
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
