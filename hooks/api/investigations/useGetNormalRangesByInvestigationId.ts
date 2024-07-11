
import { useState, useEffect, useCallback } from 'react';
import debounce from "lodash/debounce";
import { NormalRangesDto } from '@/types/commonTypes';
import { fetchNormalRangesByInvestigationId } from '@/services/investigationAPI';

export const useGetNormalRangesByInvestigationId = () => {
    const [normalRangesData, setNormalRangesData] = useState<NormalRangesDto[]>();
    const [loadingSearchNormalRanges, setLoadingSearchNormalRanges] = useState<boolean>(true);
    const [errorSearchNormalRanges, setErrorSearchNormalRanges] = useState<Error | null>(null);
    const [investigationId, setInvestigationId] = useState<number | undefined>(undefined);

    const getNormalRangesByInvestigationId = useCallback(
        debounce(async (investigationId: number, signal: AbortSignal) => {
            setLoadingSearchNormalRanges(true);
            try {
                const normalRanges = await fetchNormalRangesByInvestigationId(investigationId, signal);
                setNormalRangesData(normalRanges);
            } catch (error: any) {
                if (error.name !== 'AbortError') {
                    setErrorSearchNormalRanges(error);
                }
            } finally {
                setLoadingSearchNormalRanges(false);
            }
        }, 500),
        []
    );

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        if (investigationId) {
            getNormalRangesByInvestigationId(investigationId, signal);
        }

        return () => controller.abort();
    }, [investigationId, getNormalRangesByInvestigationId]);

    return { normalRangesData, loadingSearchNormalRanges, errorSearchNormalRanges, setInvestigationId };
};

export const useGetNormalRanges = (investigationId: number) => {
    const [normalRangesData, setNormalRangesData] = useState<NormalRangesDto[]>();
    const [loadingNormalRanges, setLoadingNormalRanges] = useState<boolean>(true);
    const [errorNormalRanges, setErrorNormalRanges] = useState<Error | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const loadNormalRanges = async () => {
            setLoadingNormalRanges(true);
            try {
                const normalRanges = await fetchNormalRangesByInvestigationId(investigationId, signal);
                setNormalRangesData(normalRanges);
            } catch (error: any) {
                if (error.name !== 'AbortError') {
                    setErrorNormalRanges(error);
                }
            } finally {
                setLoadingNormalRanges(false);
            }
        };

        loadNormalRanges();

        return () => {
            controller.abort();
        };
    }, [investigationId]);

    return { normalRangesData, loadingNormalRanges, errorNormalRanges };
};