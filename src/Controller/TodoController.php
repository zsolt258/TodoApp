<?php

namespace App\Controller;

use App\Entity\Todo;
use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManagerInterface;
use http\Env\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/todo", name="todo")
 */
class TodoController extends AbstractController
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * @var TodoRepository
     */
    private $todoRepository;

    /**
     * @param EntityManagerInterface $entityManager
     * @param TodoRepository $todoRepository
     */
    public function __construct(EntityManagerInterface $entityManager, TodoRepository $todoRepository)
    {
        $this->entityManager = $entityManager;
        $this->todoRepository = $todoRepository;
    }

    /**
     * @Route("/", name="list", methods={"GET"})
     */
    public function list(): JsonResponse
    {
        return $this->json(array_map(function (Todo $todo){
            return $todo->toArray();
        }, $this->todoRepository->findAll()));
    }

    /**
     * @Route("/create", name="create", methods={"POST"})
     */
    public function create(Request $request): JsonResponse
    {
        $content = json_decode($request->getContent());
        $todo = new Todo();
        $todo->setName($content->name);

        try {
            $this->entityManager->persist($todo);
            $this->entityManager->flush();
        } catch (\Exception $exception) {
            error_log($exception->getMessage());
        }

        return $this->json(['todo' => $todo->toArray()]);
    }

    /**
     * @Route("/update/{id}", name="update", methods={"PUT"})
     * @param Request $request
     * @param Todo $todo
     * @return JsonResponse
     */
    public function update(Request $request, Todo $todo): JsonResponse
    {
        try{
            $content = json_decode($request->getContent());
            $todo->setName($content->name);
            $this->entityManager->flush();
        } catch (\Exception $exception) {
            error_log($exception->getMessage());
            return $this->json(['Message' => 'Cannot find this todo object in the repository'],
                ResponseAlias::HTTP_NOT_FOUND);
        }

        return $this->json([
            'message' => 'Todo has been updated!'
        ]);
    }

    /**
     * @Route("/delete/{id}", name="delete", methods={"DELETE"})
     * @param Todo $todo
     * @return JsonResponse
     */
    public function delete(Todo $todo): JsonResponse
    {
        try {
            $this->entityManager->remove($todo);
            $this->entityManager->flush();
        } catch (\Exception $exception) {
            error_log($exception->getMessage());
            return $this->json(['Message' => 'Cannot find this todo object in the repository'],
                ResponseAlias::HTTP_NOT_FOUND);
        }
        return $this->json(['Message' => 'Successfully deleted the followed todo']);
    }
}