<?php

namespace App\Traits;

trait ApiResponse
{
    protected function successResponse($data,  $message = null, $code = 200,)
    {
        return response()->json([
            'message' => $message,
            'data' => $data
        ], $code);
    }

    protected function errorResponse($errors, $code, $message = null)
    {
        return response()->json([
            'errors' => $errors,
            'message' => $message
        ], $code);
    }
}
