import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AttributeProps {
    attributes: {
        [key: string]: string[];
    };
}

export function Attributes({ attributes }: AttributeProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">View</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[auto]">
                <DialogHeader>
                    <DialogTitle>Attributes</DialogTitle>
                    <DialogDescription>ข้อมูลส่วนตัว</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {Object.keys(attributes).map((key) => (
                        <div key={key} className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor={key} className="text-right">
                                {key}
                            </Label>
                            <Input
                                id={key}
                                value={attributes[key]?.length ? attributes[key].toString() : ''}
                                readOnly
                                className="col-span-3"
                            />
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
