"use client";

import {
  movieSchema,
  type MovieFormValues,
} from "@/libs/validations/movie.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Film, Image, Plus, Trash2, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface AddMovieModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface ActorPreview {
  index: number;
  preview: string | null;
  file: File | null;
}

export function AddMovieModal({
  open,
  onClose,
  onSuccess,
}: AddMovieModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [posterPreview, setPosterPreview] = useState<string | null>(null);
  const [actorPreviews, setActorPreviews] = useState<ActorPreview[]>([]);
  const posterInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<MovieFormValues>({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      title: "",
      rating: 7,
      duration: "",
      year: 2026,
      director: "",
      genre: "",
      summary: "",
      actors: [{ name: "", avatar: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "actors" });

  const handlePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file, { shouldValidate: true });
      const reader = new FileReader();
      reader.onloadend = () => setPosterPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleActorAvatarChange = (index: number, file: File) => {
    setValue(`actors.${index}.avatar`, file, { shouldValidate: true });

    const reader = new FileReader();
    reader.onloadend = () => {
      setActorPreviews((prev) => {
        const existing = prev.find((p) => p.index === index);
        if (existing) {
          return prev.map((p) =>
            p.index === index
              ? { ...p, preview: reader.result as string, file }
              : p,
          );
        }
        return [...prev, { index, preview: reader.result as string, file }];
      });
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: MovieFormValues) => {
    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("rating", data.rating.toString());
      formData.append("duration", data.duration);
      formData.append("year", data.year.toString());
      formData.append("director", data.director);
      formData.append("genre", data.genre);
      formData.append("summary", data.summary);
      formData.append("image", data.image);

      const actorsForJson = data.actors.map((actor, index) => {
        const preview = actorPreviews.find((p) => p.index === index);
        if (preview?.file) {
          formData.append(`actor_avatar_${index}`, preview.file);
          return { ...actor, avatar: "" };
        }
        return actor;
      });

      formData.append("actors", JSON.stringify(actorsForJson));

      const response = await fetch("/api/movies", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "خطا در افزودن فیلم");
      }

      toast.success(result.message || "فیلم با موفقیت اضافه شد");
      setPosterPreview(null);
      setActorPreviews([]);
      reset();
      onClose();
      onSuccess();
    } catch (err: any) {
      toast.error(err.message || "خطا در افزودن فیلم");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-xl">
              <Film className="h-5 w-5 text-indigo-400" />
            </div>
            <h2 className="text-white font-bold text-lg">افزودن فیلم جدید</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              تصویر پوستر فیلم
            </label>
            <input
              type="file"
              ref={posterInputRef}
              accept="image/jpeg,image/png,image/webp"
              onChange={handlePosterChange}
              className="hidden"
            />

            {posterPreview ? (
              <div
                className="relative group cursor-pointer"
                onClick={() => posterInputRef.current?.click()}
              >
                <img
                  src={posterPreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-xl border border-gray-700"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                  <Upload className="h-6 w-6 text-white" />
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => posterInputRef.current?.click()}
                className="w-full h-48 border-2 border-dashed border-gray-700 hover:border-indigo-500/50 rounded-xl flex flex-col items-center justify-center gap-3 text-gray-500 hover:text-indigo-400 transition-all duration-300"
              >
                <Image className="h-8 w-8" />
                <span className="text-sm">کلیک کنید یا تصویر را بکشید</span>
                <span className="text-xs">JPG, PNG, WebP (حداکثر ۲MB)</span>
              </button>
            )}
            {errors.image && (
              <p className="text-red-400 text-xs mt-1">
                {(errors.image as any)?.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                نام فیلم
              </label>
              <input
                {...register("title")}
                placeholder="نام فیلم"
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
              />
              {errors.title && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                امتیاز (۰-۱۰)
              </label>
              <input
                type="number"
                step="0.1"
                {...register("rating", { valueAsNumber: true })}
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
              />
              {errors.rating && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.rating.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                مدت زمان
              </label>
              <input
                {...register("duration")}
                placeholder="مثلاً ۱۲۰ دقیقه"
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
              />
              {errors.duration && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.duration.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                سال انتشار
              </label>
              <input
                type="number"
                {...register("year", { valueAsNumber: true })}
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
              />
              {errors.year && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.year.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                کارگردان
              </label>
              <input
                {...register("director")}
                placeholder="نام کارگردان"
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
              />
              {errors.director && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.director.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">ژانر</label>
              <input
                {...register("genre")}
                placeholder="مثلاً اکشن, درام"
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm"
              />
              {errors.genre && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.genre.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              خلاصه فیلم
            </label>
            <textarea
              {...register("summary")}
              rows={3}
              placeholder="خلاصه داستان..."
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm resize-none"
            />
            {errors.summary && (
              <p className="text-red-400 text-xs mt-1">
                {errors.summary.message}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-400">بازیگران</label>
              <button
                type="button"
                onClick={() => append({ name: "", avatar: "" })}
                className="flex items-center gap-1 px-3 py-1.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
              >
                <Plus className="h-3 w-3" /> افزودن بازیگر
              </button>
            </div>
            {errors.actors?.root && (
              <p className="text-red-400 text-xs">
                {errors.actors.root.message}
              </p>
            )}

            {fields.map((field, index) => {
              const actorPreview = actorPreviews.find((p) => p.index === index);

              return (
                <div
                  key={field.id}
                  className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl border border-gray-700/50"
                >
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleActorAvatarChange(index, file);
                      }}
                      className="hidden"
                      id={`actor-avatar-${index}`}
                    />
                    <label
                      htmlFor={`actor-avatar-${index}`}
                      className="cursor-pointer"
                    >
                      {actorPreview?.preview ? (
                        <img
                          src={actorPreview.preview}
                          alt="Avatar"
                          className="w-14 h-14 rounded-xl object-cover border border-gray-600"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-gray-700 border border-gray-600 flex items-center justify-center text-gray-500 hover:text-indigo-400 hover:border-indigo-500/50 transition-all">
                          <Upload className="h-5 w-5" />
                        </div>
                      )}
                    </label>
                  </div>

                  <div className="flex-1 flex flex-col gap-2">
                    <div>
                      <input
                        {...register(`actors.${index}.name`)}
                        placeholder="نام بازیگر"
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      />
                      {errors.actors?.[index]?.name && (
                        <p className="text-red-400 text-[10px] mt-0.5">
                          {errors.actors[index].name.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        remove(index);
                        setActorPreviews((prev) =>
                          prev.filter((p) => p.index !== index),
                        );
                      }}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors text-sm"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl font-medium transition-colors text-sm"
            >
              {isSubmitting ? "در حال افزودن..." : "افزودن فیلم"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
