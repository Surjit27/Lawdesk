import { create } from 'zustand';
import { categories, legalDocuments } from '../data/lawLibraryData';
import { LegalDocument, Category } from '../types/lawLibrary';

interface LawLibraryState {
  categories: Category[];
  documents: Record<string, LegalDocument[]>;
  selectedCategory: string | null;
  selectedDocument: LegalDocument | null;
  searchQuery: string;
  setSelectedCategory: (category: string) => void;
  setSelectedDocument: (document: LegalDocument | null) => void;
  setSearchQuery: (query: string) => void;
  getFilteredDocuments: () => LegalDocument[];
}

export const useLawLibraryStore = create<LawLibraryState>((set, get) => ({
  categories,
  documents: legalDocuments,
  selectedCategory: null,
  selectedDocument: null,
  searchQuery: '',

  setSelectedCategory: (category) => set({ selectedCategory: category, selectedDocument: null }),
  setSelectedDocument: (document) => set({ selectedDocument: document }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  getFilteredDocuments: () => {
    const { selectedCategory, documents, searchQuery } = get();
    if (!selectedCategory) return [];

    const categoryDocuments = documents[selectedCategory] || [];
    if (!searchQuery) return categoryDocuments;

    return categoryDocuments.filter(doc => 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  },
}));