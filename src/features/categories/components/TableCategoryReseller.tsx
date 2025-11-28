import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FindCategoryReseller, UpsertCategoryReseller } from "../types";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Check, Eye, Edit } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useUpdateCategoryReseller } from "../useGetAllCategory";
import { ImageUpload } from "@/features/upload/ImageUpload";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function TableCategoryReseller({ data }: { data: FindCategoryReseller[] }) {
    const { mutate, isPending } = useUpdateCategoryReseller();
    
    // Local state for displaying updates immediately
    const [localData, setLocalData] = useState(data);
    
    // Track changes per category
    const [categoryChanges, setCategoryChanges] = useState<Record<number, {
        thumbnail?: string;
        banner?: string;
        name?: string;
        description?: string;
    }>>({});

    // Sync local data with prop data when it changes
    useEffect(() => {
        setLocalData(data);
    }, [data]);

    // Track which categories have unsaved changes
    const hasChanges = (categoryId: number) => {
        return categoryChanges[categoryId] !== undefined;
    };

    // Handle image URL change
    const handleImageChange = (categoryId: number, fieldType: 'thumbnail' | 'banner', newUrl: string) => {
        setCategoryChanges(prev => ({
            ...prev,
            [categoryId]: {
                ...prev[categoryId],
                [fieldType]: newUrl
            }
        }));
    };

    // Handle text field change (name)
    const handleNameChange = (categoryId: number, newValue: string) => {
        setCategoryChanges(prev => ({
            ...prev,
            [categoryId]: {
                ...prev[categoryId],
                name: newValue
            }
        }));
    };

    // Handle description change
    const handleDescriptionChange = (categoryId: number, newValue: string) => {
        setCategoryChanges(prev => ({
            ...prev,
            [categoryId]: {
                ...prev[categoryId],
                description: newValue
            }
        }));
    };

    // Handle submit for a specific category
    const handleSubmit = (item: FindCategoryReseller) => {
        const changes = categoryChanges[item.category_id];
        
        if (!changes) {
            toast.error("Tidak ada perubahan untuk disimpan");
            return;
        }

        const updateData: UpsertCategoryReseller = {
            category_id: item.category_id,
            thumbnail: changes.thumbnail || item.thumbnail || item.category_thumbnail as string,
            banner: changes.banner || item.banner || item.category_banner as string,
            description: changes.description || item.description as string,
            name: changes.name || item.name as string
        };

        // OPTIMISTIC UPDATE: Update UI immediately
        setLocalData(prevData => 
            prevData.map(cat => 
                cat.category_id === item.category_id 
                    ? {
                        ...cat,
                        name: updateData.name,
                        description: updateData.description,
                        thumbnail: updateData.thumbnail,
                        banner: updateData.banner,
                        category_thumbnail: updateData.thumbnail,
                        category_banner: updateData.banner,
                    }
                    : cat
            )
        );

        mutate(updateData, {
            onSuccess: () => {
                toast.success("Update Categories Berhasil");
                setCategoryChanges(prev => {
                    const newChanges = { ...prev };
                    delete newChanges[item.category_id];
                    return newChanges;
                });
            },
            onError: (error) => {
                toast.error("Gagal update categories");
                setLocalData(data);
            }
        });
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Category Name</TableHead>
                    <TableHead>Category Description</TableHead>
                    <TableHead className="text-center">Thumbnail</TableHead>
                    <TableHead className="text-center">Banner</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {localData.map((item, idx) => {
                    const currentName = categoryChanges[item.category_id]?.name ?? item.name;
                    const currentDescription = categoryChanges[item.category_id]?.description ?? item.description;
                    const currentThumbnail = categoryChanges[item.category_id]?.thumbnail ?? item.thumbnail ?? item.category_thumbnail;
                    const currentBanner = categoryChanges[item.category_id]?.banner ?? item.banner ?? item.category_banner;
                    
                    const hasNameChange = categoryChanges[item.category_id]?.name !== undefined;
                    const hasDescChange = categoryChanges[item.category_id]?.description !== undefined;
                    
                    return (
                        <TableRow key={item.category_id}>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Input 
                                        value={currentName} 
                                        onChange={(e) => handleNameChange(item.category_id, e.target.value)}
                                        className={hasNameChange ? "border-orange-500" : ""}
                                    />
                                    {hasNameChange && (
                                        <span className="h-2 w-2 rounded-full bg-orange-500 flex-shrink-0" title="Has unsaved changes" />
                                    )}
                                </div>
                            </TableCell>
                            <TableCell className="max-w-xs">
                                <DescriptionDialog
                                    description={currentDescription ?? ""}
                                    categoryId={item.category_id}
                                    onDescriptionChange={handleDescriptionChange}
                                    hasChanges={hasDescChange}
                                />
                            </TableCell>
                            <TableCell className="text-center">
                                <ImageDialog
                                    src={currentThumbnail ?? ''}
                                    alt={`${item.name} thumbnail`}
                                    categoryId={item.category_id}
                                    fieldType="thumbnail"
                                    title="Category Thumbnail"
                                    onImageChange={handleImageChange}
                                    currentChangedUrl={categoryChanges[item.category_id]?.thumbnail}
                                />
                            </TableCell>
                            <TableCell className="text-center">
                                <ImageDialog
                                    fieldType="banner"
                                    src={currentBanner ?? ''}
                                    alt={`${item.name} banner`}
                                    title="Category Banner"
                                    categoryId={item.category_id}
                                    onImageChange={handleImageChange}
                                    currentChangedUrl={categoryChanges[item.category_id]?.banner}
                                />
                            </TableCell>
                            <TableCell className="flex justify-center items-center text-center">
                                <Button 
                                    className="rounded-full p-2"
                                    onClick={() => handleSubmit(item)}
                                    disabled={!hasChanges(item.category_id) || isPending}
                                    variant={hasChanges(item.category_id) ? "default" : "secondary"}
                                >
                                    <Check className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}

function DescriptionDialog({
    description,
    categoryId,
    onDescriptionChange,
    hasChanges,
}: {
    description: string;
    categoryId: number;
    onDescriptionChange: (categoryId: number, newValue: string) => void;
    hasChanges: boolean;
}) {
    const [open, setOpen] = useState(false);
    const [tempValue, setTempValue] = useState(description);

    const handleSave = () => {
        onDescriptionChange(categoryId, tempValue);
        setOpen(false);
    };

    const handleOpenChange = (isOpen: boolean) => {
        if (isOpen) {
            setTempValue(description);
        }
        setOpen(isOpen);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors w-full justify-start">
                    <Edit className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate flex-1 text-left">
                        {description || "No description"}
                    </span>
                    {hasChanges && (
                        <span className="ml-1 h-2 w-2 rounded-full bg-orange-500 flex-shrink-0" title="Has unsaved changes" />
                    )}
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Edit Category Description</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Textarea
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        placeholder="Enter category description..."
                        className="min-h-[200px] resize-none"
                    />
                    <div className="flex justify-end gap-2">
                        <Button 
                            variant="outline" 
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={handleSave}
                            disabled={tempValue === description}
                        >
                            Apply Changes
                        </Button>
                    </div>
                </div>
                {hasChanges && (
                    <p className="text-sm text-orange-600 mt-2">
                        ⚠️ Ada perubahan yang belum disimpan. Klik tombol checklist untuk menyimpan.
                    </p>
                )}
            </DialogContent>
        </Dialog>
    );
}

function ImageDialog({
    src,
    alt,
    title,
    categoryId,
    fieldType,
    onImageChange,
    currentChangedUrl,
}: {
    src: string;
    alt: string;
    title: string;
    categoryId: number;
    fieldType: 'thumbnail' | 'banner';
    onImageChange: (categoryId: number, fieldType: 'thumbnail' | 'banner', newUrl: string) => void;
    currentChangedUrl?: string;
}) {
    const [open, setOpen] = useState<boolean>(false);
    
    const displayUrl = currentChangedUrl || src;

    const handleUrlChange = (newUrl: string) => {
        onImageChange(categoryId, fieldType, newUrl);
    };

   

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors">
                    <Eye className="h-4 w-4" />
                    View
                    {currentChangedUrl && (
                        <span className="ml-1 h-2 w-2 rounded-full bg-orange-500" title="Has unsaved changes" />
                    )}
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className={`relative w-full ${fieldType === "thumbnail" ? "h-[500px]" : "h-[200px]"} rounded-lg overflow-hidden bg-gray-100`}>
                    {displayUrl && (
                        <Image
                            src={displayUrl}
                            alt={alt}
                            fill
                            className="bg-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    )}
                </div>
                <ImageUpload
                    onUrlChange={handleUrlChange}
                    currentUrl={displayUrl}
                    className="mt-4"
                />
                {currentChangedUrl && (
                    <p className="text-sm text-orange-600 mt-2">
                        ⚠️ Ada perubahan yang belum disimpan. Klik tombol checklist untuk menyimpan.
                    </p>
                )}
            </DialogContent>
        </Dialog>
    );
}