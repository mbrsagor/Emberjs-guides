class GetterSetterClass {

    private String name;
    private int age;

    // Here, getter and setter implementations
    public int getAge() {
        return age;
    }

    public String getName() {
        return name;
    }

    public int setAge(int new_age) {
        age = new_age;
        return age;
    }

    public String setName(String new_name) {
        name = new_name;
        return name;
    }

}


class EncapsulationDemo {
    public static void main(String[] args){
        GetterSetterClass  getterSetter = new GetterSetterClass();
        getterSetter.setAge(26);
        getterSetter.setName("Bozlur Rosid Sagor");

        System.out.print("Name : " + getterSetter.getName()+"\n" + "Age : " + getterSetter.getAge());
    }
}
