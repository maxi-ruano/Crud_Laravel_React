<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
   
  
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 3); 
        $orderBy = $request->input('order_by', 'id'); 
        $orderDirection = $request->input('order_direction', 'asc'); 

       
        $products = Product::with('category')  
            ->orderBy($orderBy, $orderDirection)
            ->paginate($perPage);

        return response()->json($products);
        
        
    }
    

public function store(Request $request)
{
    try {
        $validatedData = $request->validate([
            'description' => 'required',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
        ]);

        $product = new Product();
        $product->description = $validatedData['description'];
        $product->price = $validatedData['price'];
        $product->stock = $validatedData['stock'];
        $product->category_id = $validatedData['category_id']; 

        $product->save();

        return response()->json(['message' => 'Product created successfully'], 201);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Complete all fields', 'message' => $e->getMessage()], 500);
    }
}

    public function show($id)
    {
      $product =  Product::find($id);
      return $product;
    }

    

public function update(Request $request, $id)
{
    try {
        $validatedData = $request->validate([
            'description' => 'required',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
        ]);

        $product = Product::findOrFail($id);

        $product->description = $validatedData['description'];
        $product->price = $validatedData['price'];
        $product->stock = $validatedData['stock'];
        $product->category_id = $validatedData['category_id']; 

        $product->save();

        return response()->json(['message' => 'Product updated successfully'], 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Complete all fields', 'message' => $e->getMessage()], 500);
    }
}

    public function destroy($id)
{
    try {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully'], 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Error deleting product'], 500);
    }
}

}
