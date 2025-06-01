import React from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { useLawLibraryStore } from "../store/lawLibraryStore";
import DocumentsList from "../components/lawLibrary/DocumentsList";
import DocumentViewer from "../components/lawLibrary/DocumentViewer";
import CategoryButton from "../components/lawLibrary/CategoryButton";

const LawLibrary = () => {
  const {
    categories,
    selectedCategory,
    selectedDocument,
    searchQuery,
    setSelectedCategory,
    setSearchQuery,
  } = useLawLibraryStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Law Library</h1>
            <p className="mt-2 text-gray-600">
              Access comprehensive legal resources and materials
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5 text-green-500" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <CategoryButton
                    key={category.id}
                    id={category.id}
                    name={category.name}
                    icon={category.icon}
                    count={category.count}
                    isSelected={selectedCategory === category.id}
                    onClick={() => setSelectedCategory(category.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedDocument ? <DocumentViewer /> : <DocumentsList />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawLibrary;
