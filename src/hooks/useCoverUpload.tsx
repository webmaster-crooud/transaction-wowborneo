// hooks/useCoverUpload.ts
import { useState, useEffect, useCallback } from 'react';
import { useSetAtom } from 'jotai';
import { errorAtom } from '@/stores';
import { deleteCoverImage, getCoverImage, saveCoverImage } from '@/lib/idb';
import { IImage } from '@/types';

export const useCoverUpload = (entityType: string, entityId: string, storageKeyPrefix: string = 'cover', imageType: 'PHOTO' | 'COVER' = 'COVER') => {
    const [cover, setCover] = useState<IImage | null>(null);
    const setError = useSetAtom(errorAtom);
    const storageKey = `${storageKeyPrefix}_${entityType}_${entityId}`;

    useEffect(() => {
        const loadCover = async () => {
            const coverId = localStorage.getItem(storageKey);
            if (coverId) {
                const blob = await getCoverImage(Number(coverId));
                if (blob) {
                    setCover({
                        id: Number(coverId),
                        imageType: imageType,
                        entityType,
                        source: URL.createObjectURL(blob),
                        alt: 'Cover image',
                        entityId,
                    });
                }
            }
        };
        loadCover();
    }, [storageKey, setError, entityId, entityType, imageType]);

    const uploadCover = useCallback(
        async (file: File) => {
            try {
                const MAX_SIZE = 5 * 1024 * 1024;
                if (file.size > MAX_SIZE) {
                    throw new Error('Ukuran file melebihi 5MB');
                }

                const coverId = Date.now();
                await saveCoverImage(coverId, file.name, file);
                localStorage.setItem(storageKey, coverId.toString());

                const newCover: IImage = {
                    id: coverId,
                    imageType: 'COVER',
                    entityType,
                    source: URL.createObjectURL(file),
                    alt: file.name,
                    entityId,
                };

                setCover(newCover);
                return newCover;
            } catch (error) {
                setError({ message: error instanceof Error ? error.message : 'Gagal upload cover' });
                return null;
            }
        },
        [entityType, entityId, storageKey, setError],
    );

    const removeCover = useCallback(async () => {
        const coverId = localStorage.getItem(storageKey);
        if (coverId) {
            await deleteCoverImage(Number(coverId));
            localStorage.removeItem(storageKey);
        }
        setCover(null);
    }, [storageKey]);

    return { cover, uploadCover, removeCover };
};
