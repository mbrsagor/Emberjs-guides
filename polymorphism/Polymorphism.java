class Animal {
    public void animalSound(){
        System.out.println("Calling from Animal: The animal makes a sound");
    }
}

class Pig extends Animal {
    public void animalSound() {
      System.out.println("Calling from Pig: The pig says: wee wee");
    }
  }

class Dog extends Animal {
    public void animalSound() {
      System.out.println("Calling from Dog: The dog says: bow wow");
    }
  }

class Polymorphism extends Animal {
    public static void main(String[] args){

        Animal animal = new Animal();
        Pig pig = new Pig();
        Dog dog = new Dog();

        animal.animalSound();
        pig.animalSound();
        dog.animalSound();
    }
}
