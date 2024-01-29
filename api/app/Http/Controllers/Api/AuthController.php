<?php




namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User; 
use Illuminate\Support\Facades\Auth;
class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string',
                'email' => 'required|email|unique:users',
                'password' => 'required|string|min:6|confirmed',
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

          
            $token = $user->createToken('token-name')->plainTextToken;

            return response()->json(['message' => 'Usuario registrado correctamente', 'token' => $token], 201);

        } catch (\Exception $e) {
            
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }



    public function login(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

   
    $user = User::where('email', $request->email)->first();

    if (!$user) {
        return response()->json(['error' => 'El usuario no existe'], 404);
    }

    
    if (!Auth::attempt($request->only('email', 'password'))) {
        throw ValidationException::withMessages([
            'error' => ['Credenciales incorrectas'],
        ]);
    }

    $user = User::where('email', $request->email)->first();

    $token = $user->createToken('token-name')->plainTextToken;

    return response()->json(['token' => $token, 'message' => 'Inicio de sesión exitoso', 'user' => $user]);
}

}
