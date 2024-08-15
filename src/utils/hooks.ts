import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../store'
import { ElementService } from './ElementService'
import { useEffect } from 'react'
import { updateElements } from '../store/slice/elementSlice'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export const useRandomeHeight = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
}

export const useListentArraySizeChange = () => {
    const arraySize = useAppSelector((state) => state.settings.arraySize);
    const dispatch = useAppDispatch();
    useEffect(() => {
        const service = new ElementService();
        const createdArray = service.createAray(arraySize);
        dispatch(updateElements(createdArray));
    }, [arraySize]);

}

export const useSuffleElements = () => {
    const arraySize = useAppSelector((state) => state.settings.arraySize);
    useUpdateElementArray(arraySize);
}

export const useUpdateElementArray = (length: number) => {
    const service = new ElementService();
    const dispatch = useAppDispatch();
    const createdArray = service.createAray(length);
    dispatch(updateElements(createdArray));
}

export const useEnumToArray = (enumme: { [key: string]: any }) => {
    const values: string[] = [];

    for (let key in enumme) {
        values.push(key);
    }

    return values;
}