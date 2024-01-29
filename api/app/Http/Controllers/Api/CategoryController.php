<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return $categories;
    }


 
    public function store(Request $request)
{
    try {
        // Validaciones
        $validatedData = $request->validate([
            'name' => 'required|unique:categories|max:255',
        ]);

        $category = new Category();
        $category->name = $validatedData['name'];

        $category->save();

        return response()->json(['message' => 'Category created successfully'], 201);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Complete all fields', 'message' => $e->getMessage()], 500);
    }
}

    
    public function show($id)
    {
      $category =  Category::find($id);
      return $category;
    }

    


public function update(Request $request, $id)
{
    try {
        $validatedData = $request->validate([
            'name' => 'required|unique:categories|max:255',
        ]);

        $category = Category::findOrFail($id);

        $category->name = $validatedData['name'];
        $category->save();

        return response()->json(['message' => 'Category updated successfully'], 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Complete all fields', 'message' => $e->getMessage()], 500);
    }
}

    public function destroy($id)
{
    try {
        $category = Category::findOrFail($id);
        $category->delete();

        return response()->json(['message' => 'Category deleted successfully'], 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Complete all fields', 'message' => $e->getMessage()], 500);
    }
}

}














