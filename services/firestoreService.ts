import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit as firestoreLimit,
    serverTimestamp,
    DocumentData,
    QueryConstraint
} from 'firebase/firestore';
import { db } from './firebase';

// Types
interface QueryCondition {
    field: string;
    operator: '<' | '<=' | '==' | '!=' | '>=' | '>' | 'array-contains' | 'in' | 'array-contains-any' | 'not-in';
    value: any;
}

interface SortOptions {
    field: string;
    direction?: 'asc' | 'desc';
}

/**
 * Create a new document in a collection
 */
export const createDocument = async <T extends DocumentData>(
    collectionName: string,
    data: T
): Promise<{ id: string } & T> => {
    try {
        const docRef = await addDoc(collection(db, collectionName), {
            ...data,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        return { id: docRef.id, ...data };
    } catch (error) {
        console.error(`Error creating document in ${collectionName}:`, error);
        throw error;
    }
};

/**
 * Get a single document by ID
 */
export const getDocument = async <T extends DocumentData>(
    collectionName: string,
    docId: string
): Promise<(T & { id: string }) | null> => {
    try {
        const docSnap = await getDoc(doc(db, collectionName, docId));
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as T & { id: string };
        }
        return null;
    } catch (error) {
        console.error(`Error getting ${collectionName}/${docId}:`, error);
        throw error;
    }
};

/**
 * Get multiple documents with optional filtering, sorting, and limiting
 */
export const getDocuments = async <T extends DocumentData>(
    collectionName: string,
    conditions: QueryCondition[] = [],
    sortBy: SortOptions | null = null,
    limitCount: number | null = null
): Promise<(T & { id: string })[]> => {
    try {
        const queryConstraints: QueryConstraint[] = [];

        // Add conditions
        conditions.forEach(({ field, operator, value }) => {
            queryConstraints.push(where(field, operator, value));
        });

        // Add sorting
        if (sortBy) {
            queryConstraints.push(orderBy(sortBy.field, sortBy.direction || 'asc'));
        }

        // Add limit
        if (limitCount) {
            queryConstraints.push(firestoreLimit(limitCount));
        }

        const q = queryConstraints.length > 0
            ? query(collection(db, collectionName), ...queryConstraints)
            : collection(db, collectionName);

        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T & { id: string }));
    } catch (error) {
        console.error(`Error getting documents from ${collectionName}:`, error);
        throw error;
    }
};

/**
 * Update an existing document
 */
export const updateDocument = async <T extends Partial<DocumentData>>(
    collectionName: string,
    docId: string,
    data: T
): Promise<{ id: string } & T> => {
    try {
        await updateDoc(doc(db, collectionName, docId), {
            ...data,
            updatedAt: serverTimestamp(),
        });
        return { id: docId, ...data };
    } catch (error) {
        console.error(`Error updating ${collectionName}/${docId}:`, error);
        throw error;
    }
};

/**
 * Delete a document
 */
export const deleteDocument = async (
    collectionName: string,
    docId: string
): Promise<boolean> => {
    try {
        await deleteDoc(doc(db, collectionName, docId));
        return true;
    } catch (error) {
        console.error(`Error deleting ${collectionName}/${docId}:`, error);
        throw error;
    }
};
