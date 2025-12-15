#include <iostream>
using namespace std;
 
class BaseClass {
public:
  int var_base;
 
    virtual  void display()
  {
    cout << "Displaying Base class"<< " variable var_base: " << var_base << endl;}
};
class DerivedClass : public BaseClass {
public:
    int var_derived;
 
      void display()
    {
        cout << "Displaying Base class"
             << "variable var_base: " << var_base << endl;
        cout << "Displaying Derived "
             << " class variable var_derived: "
             << var_derived << endl;
    }
};
// Driver Code
int main()
{
    // Pointer to base class
    BaseClass* b_p;
    BaseClass obj_base;
    DerivedClass obj_der;
    b_p = &obj_der;
    b_p->var_base = 34;
 
    //b_p->var_derived = 98;
    // output: error: ‘class BaseClass’ has no member named
    // ‘var_derived’
    b_p->display();
    b_p->var_base = 3400;
    b_p->display();

    DerivedClass* d_p;
    d_p = &obj_der;
    d_p->var_base = 9448;
    d_p->var_derived = 98;
    d_p->display();
    return 0;
}